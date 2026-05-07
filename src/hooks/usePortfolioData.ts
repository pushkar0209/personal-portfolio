"use client";

import { useState, useEffect, useCallback } from "react";
import {
  aboutApi, educationApi, experienceApi,
  projectsApi, skillsApi,
} from "@/lib/api";
import { portfolioData } from "@/data/portfolio";

// Generic fetch hook with fallback
function useFetch<T>(
  fetcher: () => Promise<T>,
  fallback: T,
  deps: unknown[] = []
) {
  const [data, setData] = useState<T>(fallback);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetcher();
      if (result) setData(result);
    } catch {
      // silently fall back to static data
      setError("Using local data");
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => { load(); }, [load]);
  return { data, loading, error, refetch: load };
}

// ── individual hooks ──────────────────────────────────────────────────────────
export function useAbout() {
  return useFetch(() => aboutApi.get(), portfolioData.personal);
}

export function useEducation() {
  return useFetch(() => educationApi.getAll(), portfolioData.education as object[]);
}

export function useExperience() {
  return useFetch(() => experienceApi.getAll(), portfolioData.experience as object[]);
}

export function useSkills() {
  return useFetch(() => skillsApi.getAll(), portfolioData.skills as object[]);
}

export function useProjects(params?: { category?: string; search?: string }) {
  const [data, setData] = useState<object[]>(portfolioData.projects);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await projectsApi.getAll(params);
      if (result?.length) setData(result);
      else if (!result?.length && params?.search) setData([]);
      else setData(portfolioData.projects);
    } catch {
      setError("Using local data");
      setData(portfolioData.projects);
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params?.category, params?.search]);

  useEffect(() => { load(); }, [load]);
  return { data, loading, error, refetch: load };
}
