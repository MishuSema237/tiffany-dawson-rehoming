import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Truck, Home as HomeIcon, Star, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PuppyCard } from "@/components/PuppyCard";
import { HomeHero } from "@/components/HomeHero";
import { cn } from "@/lib/utils";
import { Accordion, AccordionItem } from "@/components/ui/accordion";
import dbConnect from "@/lib/db";
import Puppy from "@/models/Puppy";
import Testimonial from "@/models/Testimonial";
import tiffanyAlone from "../../public/assets/tiffanyFamily/tiffanyalonecarryingdog.jpg";

export const revalidate = 0; // Dynamic

export default async function Home() {
  await dbConnect();
  const puppiesDocs = await Puppy.find({ status: "available" }).limit(3).sort({ createdAt: -1 }).lean();
  const featuredPuppies = JSON.parse(JSON.stringify(puppiesDocs)).map((p: any) => ({
    id: p._id.toString(),
    name: p.name,
    breed: p.breed,
    age: p.age,
    image: p.image,
    status: p.status,
    description: p.description,
  }));

  const testimonialDocs = await Testimonial.find({}).limit(10).sort({ date: -1 }).lean();
  const testimonials = JSON.parse(JSON.stringify(testimonialDocs)).map((t: any) => ({
    name: t.name,
    text: t.text,
    location: t.location,
    rating: Number(t.rating) || 5, // Ensure numeric rating
    image: t.image || null
  }));

  // Fallback if no testimonials in DB yet
  if (testimonials.length === 0) {
    testimonials.push(
      {
        name: "The Harrison Family",
        text: "We were hesitant at first, but Tiffany made the process so smooth. Our little Charlie is the perfect addition to our home.",
        location: "Austin, TX",
        rating: 5,
        image: "https://randomuser.me/api/portraits/men/32.jpg"
      },
      {
        name: "Sarah & Mike",
        text: "Professional, caring, and transparent. The nanny service was exceptional. We love our new puppy!",
        location: "New York, NY",
        rating: 5,
        image: "https://randomuser.me/api/portraits/women/44.jpg"
      }
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <HomeHero />

      {/* Meet Tiffany Section - NEW */}
      <section className="py-12 sm:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-brand-red-100 text-brand-red-700 text-sm font-medium mb-6">
                <Heart className="w-4 h-4 mr-2 fill-current" />
                Founder & Puppy Nanny
              </div>
              <h2 className="text-2xl font-black tracking-tight text-brand-teal-deep-900 sm:text-4xl mb-4 sm:mb-6 uppercase">Hi, I'm Tiffany.</h2>
              <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                I am not a big kennel or a faceless agency. I am a mother, a dog lover, and a passionate advocate for safe rehoming.
              </p>
              <p className="text-base sm:text-lg text-brand-white-900 mb-6 sm:mb-8 font-medium italic leading-relaxed">
                My mission is simple: to be the trusted bridge between families who can no longer keep their pets and the loving new homes these puppies deserve. Every puppy I list is vetted, loved, and personally cared for until they reach your arms.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-full px-6 h-10 border border-brand-teal-muted-700 text-brand-teal-deep-700 hover:bg-brand-teal-deep-700 hover:text-white transition-all font-medium"
              >
                Learn More About My Mission
              </Link>
            </div>
            <div className="relative h-[300px] sm:h-[400px] rounded-2xl overflow-hidden bg-brand-white-300 shadow-xl border border-brand-white-400">
              <Image
                src={tiffanyAlone}
                alt="Tiffany Dawson with a puppy"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-12 sm:py-24 bg-brand-white-200 border-y border-brand-white-300">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-brand-teal-deep-100 text-brand-teal-deep-700 mb-4 sm:mb-6 shadow-inner">
                <ShieldCheck className="h-8 w-8 sm:h-10 sm:h-10" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-brand-teal-deep-700 mb-2">Vetted Families</h3>
              <p className="text-sm sm:text-base text-brand-white-900">Every adopting family is carefully screened to ensure a safe and loving environment.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-brand-teal-deep-100 text-brand-teal-deep-700 mb-4 sm:mb-6 shadow-inner">
                <Truck className="h-8 w-8 sm:h-10 sm:h-10" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-brand-teal-deep-700 mb-2">Safe Pet Nanny Shipping</h3>
              <p className="text-sm sm:text-base text-brand-white-900">Nationwide delivery with a professional pet nanny. Your puppy travels in comfort, never cargo.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-brand-teal-deep-100 text-brand-teal-deep-700 mb-4 sm:mb-6 shadow-inner">
                <HomeIcon className="h-8 w-8 sm:h-10 sm:h-10" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-brand-teal-deep-700 mb-2">Community Driven</h3>
              <p className="text-sm sm:text-base text-brand-white-900">Connecting owners who can no longer care for their pets with families ready to love them.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Shipping Feature */}
      <section className="py-12 sm:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-max-w-2xl text-center mb-8 sm:mb-16">
            <h2 className="text-2xl font-black tracking-tight text-brand-teal-deep-900 sm:text-4xl uppercase">Professional Pet Nanny Service</h2>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-brand-white-900 font-medium">
              We understand that distance can be a barrier. That's why we offer a comprehensive shipping solution.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-xl bg-brand-teal-muted-100 border border-brand-teal-muted-300">
              <div className="absolute inset-0 flex items-center justify-center text-brand-teal-muted-300">
                <Truck className="h-24 w-24" />
              </div>
            </div>
            <div>
              <ul className="space-y-4 sm:space-y-6">
                <li className="flex gap-3 sm:gap-4">
                  <div className="flex-none rounded-full bg-brand-teal-muted-100 p-2 text-brand-teal-muted-700 shadow-sm h-fit">
                    <Truck className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-teal-deep-900 uppercase tracking-tight text-sm sm:text-base">Door-to-Door Delivery</h4>
                    <p className="text-xs sm:text-base text-brand-white-900 mt-1 font-medium italic">Our nanny picks up the puppy and delivers directly to your doorstep.</p>
                  </div>
                </li>
                <li className="flex gap-3 sm:gap-4">
                  <div className="flex-none rounded-full bg-brand-teal-muted-100 p-2 text-brand-teal-muted-700 shadow-sm h-fit">
                    <ShieldCheck className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-teal-deep-900 uppercase tracking-tight text-sm sm:text-base">In-Cabin Air Travel</h4>
                    <p className="text-xs sm:text-base text-brand-white-900 mt-1 font-medium italic">For long distances, puppies fly in the cabin with the nanny, ensuring constant care.</p>
                  </div>
                </li>
                <li className="flex gap-3 sm:gap-4">
                  <div className="flex-none rounded-full bg-brand-teal-muted-100 p-2 text-brand-teal-muted-700 shadow-sm h-fit">
                    <Truck className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-teal-deep-900 uppercase tracking-tight text-sm sm:text-base">Stress-Free Experience</h4>
                    <p className="text-xs sm:text-base text-brand-white-900 mt-1 font-medium italic">We handle all logistics so you can focus on preparing for your new family member.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Puppy Preview */}
      <section className="py-12 sm:py-24 bg-brand-white-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-10 sm:mb-16">
            <h2 className="text-2xl font-black tracking-tight text-brand-teal-deep sm:text-4xl uppercase">Meet Our Featured Puppies</h2>
            <p className="mt-4 text-base sm:text-lg text-brand-white-900 font-medium italic">
              Each puppy has a unique story and is looking for a loving home.
            </p>
          </div>
          <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 overflow-x-auto sm:overflow-x-visible pb-8 sm:pb-0 px-4 sm:px-0 snap-x snap-mandatory no-scrollbar text-center">
            {featuredPuppies.map((puppy: any) => (
              <div key={puppy.id} className="min-w-[70%] sm:min-w-0 snap-center">
                <PuppyCard puppy={puppy} />
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              href="/puppies"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-full border border-brand-teal-muted-700 text-brand-teal-deep-700 hover:bg-brand-teal-deep-700 hover:text-white transition-all px-8 h-12 font-medium"
            >
              View All Available Puppies
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 sm:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-10 sm:mb-16">
            <h2 className="text-2xl font-black tracking-tight text-brand-teal-deep-900 sm:text-4xl uppercase">Happy Beginnings</h2>
            <p className="mt-4 text-sm sm:text-base text-brand-white-900 font-medium italic">Hear from families who found their perfect match.</p>
          </div>
          <div className="flex lg:grid lg:grid-cols-2 gap-6 sm:gap-8 overflow-x-auto lg:overflow-x-visible pb-8 lg:pb-0 px-4 lg:px-0 snap-x snap-mandatory no-scrollbar">
            {testimonials.map((t: any, idx: number) => (
              <div key={idx} className="min-w-[85%] lg:min-w-0 snap-center">
                <div className="bg-brand-white-300 p-6 sm:p-8 rounded-2xl shadow-sm border border-brand-white-400 h-full flex flex-col sm:flex-row gap-6">
                  {t.image ? (
                    <div className="relative w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 rounded-2xl overflow-hidden border-2 border-white shadow-lg">
                      <Image src={t.image} alt={t.name} fill className="object-cover" />
                    </div>
                  ) : (
                    <div className="w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 rounded-2xl bg-brand-red-100 flex items-center justify-center border-2 border-white shadow-lg">
                      <Heart className="w-10 h-10 text-brand-red-700 fill-brand-red-700/20" />
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex gap-0.5 mb-2">
                      {[...Array(5)].map((_, i) => {
                        const starValue = i + 1;
                        const isHalf = t.rating === i + 0.5;
                        return (
                          <Star
                            key={i}
                            className={cn(
                              "h-4 w-4 fill-current",
                              starValue <= t.rating ? "text-yellow-400" : isHalf ? "text-yellow-400 opacity-50" : "text-brand-white-400"
                            )}
                          />
                        );
                      })}
                    </div>
                    <p className="text-brand-teal-deep-900 italic mb-4 font-medium text-sm sm:text-base leading-relaxed font-serif">"{t.text}"</p>
                    <div className="flex justify-between items-end">
                      <div>
                        <h4 className="font-bold text-brand-teal-deep-800 uppercase tracking-tight text-xs sm:text-sm">{t.name}</h4>
                        <p className="text-[9px] sm:text-[10px] font-black text-brand-white-400 uppercase tracking-widest">{t.location}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section - NEW */}
      <section className="py-24 bg-brand-white-100">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-brand-teal-deep-900 uppercase">Frequently Asked Questions</h2>
            <p className="mt-4 text-sm sm:text-base text-brand-white-900 font-medium italic">Everything you need to know about our rehoming process.</p>
          </div>

          <Accordion className="space-y-4">
            <AccordionItem
              value="start"
              title="How do I start the adoption process?"
              className="bg-brand-white-200 border-brand-white-400 rounded-2xl sm:rounded-3xl px-6 py-1 shadow-sm"
            >
              <p className="text-brand-teal-deep-900 leading-relaxed font-medium text-sm sm:text-base p-4">Click on any available puppy to view their details, then click "Apply to Adopt". Once you submit the 8-question application, Tiffany will personally review it and reach out via email or phone within 24-48 hours.</p>
            </AccordionItem>

            <AccordionItem
              value="breeder"
              title="Are you a breeder?"
              className="bg-brand-white-200 border-brand-white-400 rounded-2xl sm:rounded-3xl px-6 py-1 shadow-sm"
            >
              <p className="text-brand-teal-deep-900 leading-relaxed font-medium text-sm sm:text-base p-4">No. Tiffany acts as an intermediary for families who can no longer care for their puppies. Our mission is rehoming, not breeding.</p>
            </AccordionItem>

            <AccordionItem
              value="vaccines"
              title="Are the puppies vaccinated?"
              className="bg-brand-white-200 border-brand-white-400 rounded-2xl sm:rounded-3xl px-6 py-1 shadow-sm"
            >
              <p className="text-brand-teal-deep-900 leading-relaxed font-medium text-sm sm:text-base p-4">Yes. Every puppy we list is up-to-date on age-appropriate vaccinations and has undergone a thorough health check by a licensed veterinarian.</p>
            </AccordionItem>

            <AccordionItem
              value="shipping"
              title="How does the Pet Nanny shipping work?"
              className="bg-brand-white-200 border-brand-white-400 rounded-2xl sm:rounded-3xl px-6 py-1 shadow-sm"
            >
              <p className="text-brand-teal-deep-900 leading-relaxed font-medium text-sm sm:text-base p-4">We use professional Pet Nannies who travel with the puppy in the cabin (on planes) or in a climate-controlled vehicle (on land). The puppy is never alone.</p>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24 bg-brand-teal-deep-800 text-brand-white-100 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-brand-red-700/5 -z-10" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-black tracking-tight mb-4 sm:mb-6 sm:text-4xl uppercase">Ready to open your heart?</h2>
          <p className="text-gray-300 mb-8 sm:mb-10 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed font-medium">
            Adopting a puppy is a life-changing decision. We are here to guide you every step of the way.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-brand-red-700 text-white hover:bg-brand-red-600 px-8 h-12 sm:h-14 sm:px-10 text-sm sm:text-lg font-black shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 active:translate-y-0 border-none uppercase tracking-widest"
          >
            Start Adoption Application
          </Link>
        </div>
      </section>
    </div>
  );
}
