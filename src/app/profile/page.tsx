"use client";

import { FormEvent, useEffect, useState } from "react";
import { BadgeCheck } from "lucide-react";
import TopBar from "@/components/TopBar";
import InstallAppButton from "@/components/InstallAppButton";
import { categories } from "@/data/attraction";
import { readJsonFromStorage, writeJsonToStorage } from "@/lib/storage";
import type { AttractionCategory, UserProfile } from "@/types";

const PROFILE_STORAGE_KEY = "journeylk:profile";

const defaultProfile: UserProfile = {
  name: "",
  preferredCity: "Colombo",
  preferredCategory: "All",
};

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);
  const [savedMessage, setSavedMessage] = useState("");
  const [nameError, setNameError] = useState("");

  useEffect(() => {
    setProfile(readJsonFromStorage<UserProfile>(PROFILE_STORAGE_KEY, defaultProfile));
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (profile.name.trim().length > 0 && profile.name.trim().length < 2) {
      setNameError("Name must contain at least 2 characters.");
      return;
    }

    setNameError("");
    writeJsonToStorage(PROFILE_STORAGE_KEY, profile);
    setSavedMessage("Profile preferences saved in LocalStorage.");
  }

  return (
    <div>
      <TopBar />
      <div className="lg:mx-auto lg:max-w-6xl lg:px-8 lg:pb-12 xl:px-10">
        <section className="px-5 pb-5 pt-7 lg:px-0 lg:pb-7 lg:pt-9">
          <h1 className="text-3xl font-black text-slate-950 lg:text-4xl">Profile</h1>
          <p className="mt-2 text-slate-600 lg:text-base">Manage your JourneyLK experience.</p>
        </section>

        <div className="lg:grid lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] lg:items-start lg:gap-7">
          <form
            onSubmit={handleSubmit}
            className="mx-5 rounded-3xl bg-white p-5 shadow-md shadow-slate-900/8 ring-1 ring-slate-200 lg:mx-0 lg:p-7"
          >
            <label className="block">
              <span className="text-sm font-bold text-slate-700">Display name</span>
              <input
                value={profile.name}
                onChange={(event) => setProfile((current) => ({ ...current, name: event.target.value }))}
                placeholder="Example: Rasadhi"
                className="mt-2 min-h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 lg:min-h-14 lg:text-base"
              />
            </label>

            {nameError && <p className="mt-2 text-sm font-medium text-red-600">{nameError}</p>}

            <label className="mt-5 block">
              <span className="text-sm font-bold text-slate-700">Preferred city</span>
              <input
                value={profile.preferredCity}
                onChange={(event) =>
                  setProfile((current) => ({ ...current, preferredCity: event.target.value }))
                }
                className="mt-2 min-h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 lg:min-h-14 lg:text-base"
              />
            </label>

            <label className="mt-5 block">
              <span className="text-sm font-bold text-slate-700">Preferred category</span>
              <select
                value={profile.preferredCategory}
                onChange={(event) =>
                  setProfile((current) => ({
                    ...current,
                    preferredCategory: event.target.value as AttractionCategory,
                  }))
                }
                className="mt-2 min-h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 lg:min-h-14 lg:text-base"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </label>

            <button
              type="submit"
              className="mt-6 min-h-12 w-full rounded-2xl bg-blue-700 px-5 font-black text-white shadow-lg shadow-blue-700/25 lg:min-h-14"
            >
              Save Preferences
            </button>
            {savedMessage && (
              <p className="mt-3 flex items-center gap-2 rounded-2xl bg-emerald-50 p-3 text-sm font-semibold text-emerald-700">
                <BadgeCheck size={17} /> {savedMessage}
              </p>
            )}
          </form>

          <div>
            <InstallAppButton />
          </div>
        </div>
      </div>
    </div>
  );
}
