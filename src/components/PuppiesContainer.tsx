"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Filter, X, Search, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PuppyCard } from "@/components/PuppyCard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Puppy {
    id: string;
    name: string;
    breed: string;
    gender: string;
    age: string;
    status: "available" | "adopted" | "pending";
    image: string;
    fee: string;
    description: string;
}

interface PuppiesContainerProps {
    initialPuppies: Puppy[];
}

const CORE_BREEDS = ["Cavapoo", "Maltipoo", "Poochon"];

export function PuppiesContainer({ initialPuppies }: PuppiesContainerProps) {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [isFiltersOpen, setIsFiltersOpen] = useState(searchParams.toString() !== "");
    const [selectedBreed, setSelectedBreed] = useState<string>(searchParams.get("breed") || "All");
    const [selectedGender, setSelectedGender] = useState<string>(searchParams.get("gender") || "All");
    const [searchName, setSearchName] = useState(searchParams.get("name") || "");

    // Sync state with URL params when they change externally
    useEffect(() => {
        setSelectedBreed(searchParams.get("breed") || "All");
        setSelectedGender(searchParams.get("gender") || "All");
        setSearchName(searchParams.get("name") || "");
        if (searchParams.toString() !== "") setIsFiltersOpen(true);
    }, [searchParams]);

    // Update URL when filters change
    const updateFilters = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value === "All" || value === "") {
            params.delete(key);
        } else {
            params.set(key, value);
        }
        router.push(`/puppies?${params.toString()}`, { scroll: false });
    };

    // Extract unique breeds and genders for filter options, ensuring core breeds are there
    const breeds = useMemo(() => {
        const availableBreeds = Array.from(new Set(initialPuppies.map(p => p.breed)));
        const allPossible = Array.from(new Set([...CORE_BREEDS, ...availableBreeds]));
        return ["All", ...allPossible.sort()];
    }, [initialPuppies]);

    const genders = useMemo(() => ["All", ...Array.from(new Set(initialPuppies.map(p => p.gender)))], [initialPuppies]);

    const filteredPuppies = useMemo(() => {
        return initialPuppies.filter(puppy => {
            const matchesBreed = selectedBreed === "All" || puppy.breed === selectedBreed;
            const matchesGender = selectedGender === "All" || puppy.gender === selectedGender;
            const matchesName = puppy.name.toLowerCase().includes(searchName.toLowerCase());
            return matchesBreed && matchesGender && matchesName;
        });
    }, [initialPuppies, selectedBreed, selectedGender, searchName]);

    const clearFilters = () => {
        setSelectedBreed("All");
        setSelectedGender("All");
        setSearchName("");
        router.push("/puppies", { scroll: false });
    };

    return (
        <div className="bg-brand-white-200 min-h-screen py-20">
            <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-6">
                    <div>
                        <motion.h1
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-4xl md:text-5xl font-extrabold tracking-tight text-brand-teal-deep-700 mb-4"
                        >
                            Available Puppies
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-brand-white-900 text-lg font-medium"
                        >
                            Find your new best friend from our litter of happy, healthy pups.
                        </motion.p>
                    </div>
                    <Button
                        variant="outline"
                        onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                        className={`flex items-center gap-3 rounded-full border-2 h-12 px-6 font-bold transition-all shadow-sm ${isFiltersOpen
                            ? "bg-brand-teal-deep-700 text-white border-brand-teal-deep-700 hover:bg-brand-teal-deep-800"
                            : "bg-white text-brand-teal-deep-700 border-brand-white-400 hover:border-brand-teal-deep-300"
                            }`}
                    >
                        <Filter className={`w-5 h-5 ${isFiltersOpen ? "text-white" : "text-brand-teal-deep-700"}`} />
                        {isFiltersOpen ? "Hide Filters" : "Filter Puppies"}
                        {isFiltersOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </Button>
                </div>

                <AnimatePresence>
                    {isFiltersOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0, y: -20 }}
                            animate={{ height: "auto", opacity: 1, y: 0 }}
                            exit={{ height: 0, opacity: 0, y: -20 }}
                            className="bg-brand-white-100 rounded-[2.5rem] p-8 md:p-10 mb-12 overflow-hidden border border-brand-white-400 shadow-xl relative"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-teal-deep-100/50 rounded-full -mr-16 -mt-16" />

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                                <div className="space-y-3">
                                    <Label htmlFor="search" className="text-[10px] font-extrabold text-brand-teal-deep-700 uppercase tracking-widest ml-1">Search by Name</Label>
                                    <div className="relative">
                                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-white-700 font-black" />
                                        <Input
                                            id="search"
                                            placeholder="Find a puppy..."
                                            value={searchName}
                                            onChange={(e) => {
                                                setSearchName(e.target.value);
                                                updateFilters("name", e.target.value);
                                            }}
                                            className="pl-11 rounded-2xl border-brand-white-400 focus:ring-brand-teal-deep-300 h-12 bg-white"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <Label htmlFor="breed" className="text-[10px] font-extrabold text-brand-teal-deep-700 uppercase tracking-widest ml-1">Breed</Label>
                                    <select
                                        id="breed"
                                        className="flex h-12 w-full rounded-2xl border border-brand-white-400 bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal-deep-300 transition-all font-bold text-brand-teal-deep-900 appearance-none cursor-pointer"
                                        value={selectedBreed}
                                        onChange={(e) => {
                                            setSelectedBreed(e.target.value);
                                            updateFilters("breed", e.target.value);
                                        }}
                                    >
                                        {breeds.map(breed => (
                                            <option key={breed} value={breed}>{breed}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="space-y-3">
                                    <Label htmlFor="gender" className="text-[10px] font-extrabold text-brand-teal-deep-700 uppercase tracking-widest ml-1">Gender</Label>
                                    <select
                                        id="gender"
                                        className="flex h-12 w-full rounded-2xl border border-brand-white-400 bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal-deep-300 transition-all font-bold text-brand-teal-deep-900 appearance-none cursor-pointer"
                                        value={selectedGender}
                                        onChange={(e) => {
                                            setSelectedGender(e.target.value);
                                            updateFilters("gender", e.target.value);
                                        }}
                                    >
                                        {genders.map(gender => (
                                            <option key={gender} value={gender}>{gender}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="mt-8 flex justify-between items-center relative z-10 border-t border-brand-white-400 pt-6">
                                <p className="text-sm font-bold text-brand-white-900">
                                    Showing {filteredPuppies.length} of {initialPuppies.length} puppies
                                </p>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={clearFilters}
                                    className="text-brand-white-900 hover:text-brand-red-700 hover:bg-brand-red-100/50 rounded-full px-4 font-bold"
                                >
                                    <X className="w-4 h-4 mr-2" />
                                    Reset Filters
                                </Button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {filteredPuppies.length > 0 ? (
                    <motion.div
                        layout
                        className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3"
                    >
                        {filteredPuppies.map((puppy) => (
                            <motion.div
                                layout
                                key={puppy.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                <PuppyCard puppy={puppy} />
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-32 bg-brand-white-100 rounded-[3rem] border-2 border-dashed border-brand-white-400 shadow-inner flex flex-col items-center"
                    >
                        <div className="bg-brand-white-300 p-6 rounded-full mb-6">
                            <Heart className="w-12 h-12 text-brand-white-500" />
                        </div>
                        <h3 className="text-2xl font-bold text-brand-teal-deep-700 mb-2">No puppies found</h3>
                        <p className="text-brand-white-900 text-lg max-w-sm mx-auto mb-8">
                            We couldn't find any puppies matching your current filters.
                        </p>
                        <Button
                            onClick={clearFilters}
                            className="rounded-full bg-brand-teal-deep-700 text-white hover:bg-brand-teal-deep-800 px-8 h-12 font-bold shadow-lg"
                        >
                            See All Available Puppies
                        </Button>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
