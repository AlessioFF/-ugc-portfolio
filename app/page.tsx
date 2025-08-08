"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Instagram,
  Mail,
  Phone,
  Play,
  ArrowRight,
  ExternalLink,
  Menu,
  X,
  Camera,
  MessageCircle,
  User,
  Package,
  Pause,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

export default function UGCPortfolio() {
  const [scrollY, setScrollY] = useState(0);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isQuickLinksOpen, setIsQuickLinksOpen] = useState(false);
  const [playingVideo, setPlayingVideo] = useState<number | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const progressBarRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [videoProgress, setVideoProgress] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [draggingVideoIndex, setDraggingVideoIndex] = useState<number | null>(
    null
  );
  const didDrag = useRef(false);

  // About images carousel
  const aboutImages = [
    "/about0.jpg",
    "/about1.jpg",
    "/about2.jpg",
    "/about3.jpg",
    "/about4.jpg",
    "/about5.jpg",
  ];
  const [currentAboutImage, setCurrentAboutImage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-rotate about images every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAboutImage((prev) => (prev + 1) % aboutImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [aboutImages.length]);

  const seekVideo = (
    clientX: number,
    progressBar: HTMLDivElement,
    video: HTMLVideoElement
  ) => {
    if (!video.duration) return;
    const rect = progressBar.getBoundingClientRect();
    const pos = clientX - rect.left;
    const width = progressBar.offsetWidth;
    let progress = pos / width;
    progress = Math.max(0, Math.min(1, progress));
    const newTime = progress * video.duration;

    if (isFinite(newTime)) {
      video.currentTime = newTime;
      setVideoProgress(progress * 100);
    }
  };

  const handlePlayPauseClick = (index: number) => {
    if (playingVideo === index) {
      videoRefs.current[index]?.pause();
      setPlayingVideo(null);
    } else {
      videoRefs.current.forEach((video, i) => {
        if (i !== index && video) {
          video.pause();
        }
      });
      videoRefs.current[index]?.play();
      setPlayingVideo(index);
    }
  };

  const handleTimeUpdate = (index: number) => {
    if (videoRefs.current[index]) {
      const progress =
        (videoRefs.current[index]!.currentTime /
          videoRefs.current[index]!.duration) *
        100;
      setVideoProgress(progress);
    }
  };

  const handleMouseDown = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    didDrag.current = false;
    setIsDragging(true);
    setDraggingVideoIndex(index);
  };

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!isDragging || draggingVideoIndex === null) return;
      didDrag.current = true;
      const video = videoRefs.current[draggingVideoIndex];
      const progressBar = progressBarRefs.current[draggingVideoIndex];

      if (video && progressBar) {
        seekVideo(e.clientX, progressBar, video);
      }
    };

    const handleGlobalMouseUp = (e: MouseEvent) => {
      if (isDragging && draggingVideoIndex !== null) {
        if (!didDrag.current) {
          const video = videoRefs.current[draggingVideoIndex];
          const progressBar = progressBarRefs.current[draggingVideoIndex];
          if (video && progressBar) {
            seekVideo(e.clientX, progressBar, video);
          }
        }
        setIsDragging(false);
        setDraggingVideoIndex(null);
      }
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleGlobalMouseMove);
      window.addEventListener("mouseup", handleGlobalMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleGlobalMouseMove);
      window.removeEventListener("mouseup", handleGlobalMouseUp);
    };
  }, [isDragging, draggingVideoIndex]);

  return (
    <>
      <div className="min-h-screen bg-[#fafafa] text-black overflow-x-hidden">
        {/* Revolutionary Asymmetric Header */}
        <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
          {/* Top Right Corner - Quick Links & CTA */}
          <div className="absolute top-8 right-8 pointer-events-auto">
            <div className="flex items-center space-x-4">
              {/* Hoverable Quick Links Card */}
              <div
                className="relative"
                onMouseEnter={() => {
                  if (isClient && !isMobile) {
                    setIsQuickLinksOpen(true);
                  }
                }}
                onMouseLeave={() => {
                  if (isClient && !isMobile) {
                    setIsQuickLinksOpen(false);
                  }
                }}
                onClick={(e) => {
                  if (isClient && isMobile) {
                    e.preventDefault();
                    setIsQuickLinksOpen(!isQuickLinksOpen);
                  }
                }}
              >
                <div className="bg-white/90 backdrop-blur-xl rounded-full px-4 lg:px-6 py-3 shadow-lg border border-white/20 cursor-pointer hover:bg-white transition-all duration-300">
                  <div className="flex items-center space-x-2 lg:space-x-3 text-xs lg:text-sm">
                    <div className="flex items-center space-x-1 lg:space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="font-medium">MENU</span>
                    </div>
                    <div className="w-px h-4 bg-black/20 hidden lg:block"></div>
                    <span className="text-black/60 hidden lg:inline">
                      Explore
                    </span>
                  </div>
                </div>

                {/* Dropdown Menu */}
                <div
                  className={`absolute top-full right-0 pt-2 w-64 lg:w-64 transition-all duration-300 ${
                    isQuickLinksOpen
                      ? "opacity-100 translate-y-0 pointer-events-auto"
                      : "opacity-0 -translate-y-2 pointer-events-none"
                  }`}
                >
                  <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20">
                    <div className="p-4 space-y-2 max-h-[70vh] overflow-y-auto">
                      <div className="text-xs font-semibold text-black/60 uppercase tracking-wide mb-3">
                        Quick Access
                      </div>

                      {/* Sections */}
                      <div className="text-xs font-medium text-black/40 uppercase tracking-wide mb-2 mt-4">
                        Sections
                      </div>

                      <Link
                        href="#work"
                        className="flex items-center space-x-3 p-3 rounded-xl hover:bg-black/5 transition-colors duration-200 group"
                      >
                        <div className="w-8 h-8 bg-black/10 rounded-lg flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-200">
                          <Camera className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-medium text-sm">Portfolio</div>
                          <div className="text-xs text-black/60">
                            View my work
                          </div>
                        </div>
                      </Link>

                      <Link
                        href="#about"
                        className="flex items-center space-x-3 p-3 rounded-xl hover:bg-black/5 transition-colors duration-200 group"
                      >
                        <div className="w-8 h-8 bg-black/10 rounded-lg flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-200">
                          <User className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-medium text-sm">About</div>
                          <div className="text-xs text-black/60">
                            Know me better
                          </div>
                        </div>
                      </Link>

                      <Link
                        href="#services"
                        className="flex items-center space-x-3 p-3 rounded-xl hover:bg-black/5 transition-colors duration-200 group"
                      >
                        <div className="w-8 h-8 bg-black/10 rounded-lg flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-200">
                          <Package className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-medium text-sm">Services</div>
                          <div className="text-xs text-black/60">
                            Packages & pricing
                          </div>
                        </div>
                      </Link>

                      {/* Social Media */}
                      <div className="text-xs font-medium text-black/40 uppercase tracking-wide mb-2 mt-4">
                        Social Media
                      </div>

                      <Link
                        href="https://www.instagram.com/alexmakesugc_/"
                        target="_blank"
                        className="flex items-center space-x-3 p-3 rounded-xl hover:bg-black/5 transition-colors duration-200 group"
                      >
                        <div className="w-8 h-8 bg-black/10 rounded-lg flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-200">
                          <Instagram className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-medium text-sm">Instagram</div>
                          <div className="text-xs text-black/60">
                            @alexmakesugc_
                          </div>
                        </div>
                      </Link>

                      <Link
                        href="https://www.tiktok.com/@alexmakesugc_?is_from_webapp=1&sender_device=pc"
                        target="_blank"
                        className="flex items-center space-x-3 p-3 rounded-xl hover:bg-black/5 transition-colors duration-200 group"
                      >
                        <div className="w-8 h-8 bg-black/10 rounded-lg flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-200">
                          <svg
                            className="w-4 h-4"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                          </svg>
                        </div>
                        <div>
                          <div className="font-medium text-sm">TikTok</div>
                          <div className="text-xs text-black/60">
                            @alexmakesugc_
                          </div>
                        </div>
                      </Link>

                      {/* Contacts */}
                      <div className="text-xs font-medium text-black/40 uppercase tracking-wide mb-2 mt-4">
                        Contacts
                      </div>

                      <Link
                        href="https://wa.me/393398513143"
                        target="_blank"
                        className="flex items-center space-x-3 p-3 rounded-xl hover:bg-black/5 transition-colors duration-200 group"
                      >
                        <div className="w-8 h-8 bg-black/10 rounded-lg flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-200">
                          <svg
                            className="w-4 h-4"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                          </svg>
                        </div>
                        <div>
                          <div className="font-medium text-sm">WhatsApp</div>
                          <div className="text-xs text-black/60">
                            Quick message
                          </div>
                        </div>
                      </Link>

                      <Link
                        href="#contact"
                        className="flex items-center space-x-3 p-3 rounded-xl hover:bg-black/5 transition-colors duration-200 group"
                      >
                        <div className="w-8 h-8 bg-black/10 rounded-lg flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-200">
                          <MessageCircle className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-medium text-sm">Let's Chat</div>
                          <div className="text-xs text-black/60">
                            Start a project
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Left - Floating Navigation Trigger */}
          <div className="absolute bottom-8 left-8 pointer-events-auto">
            <button
              onClick={() => setIsNavOpen(!isNavOpen)}
              className="w-14 h-14 bg-white/90 backdrop-blur-xl rounded-full shadow-2xl border border-white/20 flex items-center justify-center hover:scale-110 transition-all duration-300"
            >
              {isNavOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Bottom Right - Social Links */}
          <div className="absolute bottom-8 right-8 pointer-events-auto">
            <div className="flex items-center space-x-3">
              {[Instagram, Mail, Phone].map((Icon, index) => (
                <Link
                  key={index}
                  href="#"
                  className="w-12 h-12 bg-white/90 backdrop-blur-xl rounded-full shadow-lg border border-white/20 flex items-center justify-center hover:scale-110 transition-all duration-300 hover:bg-black hover:text-white"
                >
                  <Icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>
        </header>

        {/* Revolutionary Radial Navigation Menu */}
        <div
          className={`fixed inset-0 z-40 transition-all duration-700 ${
            isNavOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-xl"></div>

          {/* Radial Menu Items */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-80 h-80">
              {[
                { name: "ABOUT", angle: 0, href: "#about" },
                { name: "WORK", angle: 90, href: "#work" },
                { name: "SERVICES", angle: 180, href: "#services" },
                { name: "CONTACT", angle: 270, href: "#contact" },
              ].map((item, index) => {
                const radian = (item.angle * Math.PI) / 180;
                const x = Math.cos(radian) * 120;
                const y = Math.sin(radian) * 120;

                return (
                  <a
                    key={index}
                    href={item.href}
                    onClick={() => setIsNavOpen(false)}
                    className="absolute w-20 h-20 bg-white rounded-full flex items-center justify-center text-sm font-bold hover:scale-125 transition-all duration-300 hover:bg-black hover:text-white shadow-2xl"
                    style={{
                      left: `calc(50% + ${x}px - 40px)`,
                      top: `calc(50% + ${y}px - 40px)`,
                      animationDelay: `${index * 0.1}s`,
                    }}
                  >
                    {item.name}
                  </a>
                );
              })}

              {/* Center Circle */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white font-black text-xl">M</span>
              </div>
            </div>
          </div>

          {/* Navigation Info */}
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-center text-white">
            <div className="text-2xl font-black mb-2">ALEX FERRARO</div>
            <div className="text-sm opacity-80">
              Select a section to explore
            </div>
          </div>
        </div>

        {/* Top Brand Text */}
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-40 pointer-events-auto">
          <a
            href="https://www.instagram.com/alexmakesugc_/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium tracking-[0.2em] text-black/60 uppercase hover:text-black transition-colors duration-200"
          >
            alexmakesugc_
          </a>
        </div>

        {/* Hero Section */}
        <main>
          <section className="relative min-h-screen flex items-center pt-20">
            <div className="max-w-8xl mx-auto px-6 lg:px-12 w-full">
              <div className="grid lg:grid-cols-12 gap-16 items-center min-h-[80vh]">
                <div className="lg:col-span-7 space-y-12">
                  <header className="space-y-8">
                    <div className="space-y-4">
                      <div className="text-sm font-medium tracking-[0.2em] text-black/60 uppercase">
                        LET'S GROW YOUR BRAND
                      </div>
                      <h1 className="text-[4rem] lg:text-[6rem] xl:text-[8rem] font-black leading-[0.85] tracking-tight">
                        ALEX FERRARO
                      </h1>
                      <div className="text-xl lg:text-2xl font-light tracking-wide text-black/70 italic max-w-2xl">
                        REAL ACCENT, REAL TALK
                      </div>
                    </div>
                    <p className="text-lg lg:text-xl text-black/60 max-w-2xl leading-relaxed font-light">
                      <strong>Professional UGC creator</strong> partnering with
                      Italian & North American brands to create authentic{" "}
                      <em>user-generated content</em> that resonates.
                      Specializing in <strong>men's care UGC</strong>,{" "}
                      <strong>tech UGC</strong>, and{" "}
                      <strong>fashion UGC</strong> with a genuine bilingual
                      approach that drives real engagement and conversions for
                      brands targeting men.
                    </p>
                  </header>

                  <div className="flex flex-col sm:flex-row gap-6 items-center">
                    <Button
                      size="lg"
                      className="bg-black text-white hover:bg-black/80 rounded-full px-8 py-4 text-base font-medium group"
                    >
                      VIEW PORTFOLIO
                    </Button>

                    <div className="flex gap-4">
                      <Button
                        size="lg"
                        className="bg-black text-white hover:bg-black/80 rounded-full w-14 h-14 p-0 group"
                        asChild
                      >
                        <Link
                          href="https://www.instagram.com/alexmakesugc_/"
                          target="_blank"
                        >
                          <Instagram className="w-6 h-6 group-hover:scale-110 transition-transform" />
                        </Link>
                      </Button>

                      <Button
                        size="lg"
                        className="bg-black text-white hover:bg-black/80 rounded-full w-14 h-14 p-0 group"
                        asChild
                      >
                        <Link
                          href="https://www.tiktok.com/@alexmakesugc_?is_from_webapp=1&sender_device=pc"
                          target="_blank"
                        >
                          <svg
                            className="w-6 h-6 group-hover:scale-110 transition-transform"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                          </svg>
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 relative lg:-mt-16">
                  <div className="relative">
                    <div
                      className="relative w-full max-w-2xl mx-auto transform transition-transform duration-1000"
                      style={{
                        transform: isMobile
                          ? "translateY(0px)"
                          : `translateY(${scrollY * -0.1}px)`,
                      }}
                    >
                      <Image
                        src="/hero.JPG"
                        alt="Alex Ferraro - UGC Creator"
                        width={600}
                        height={800}
                        className="rounded-3xl shadow-2xl w-full"
                      />
                      <div className="absolute -bottom-4 -left-4 bg-white rounded-xl p-3 shadow-xl border border-black/5">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                          <span className="text-xs font-semibold">
                            AVAILABLE FOR PROJECTS
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* About Section */}
        <section id="about" className="py-32 bg-white">
          <div className="max-w-8xl mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-12 gap-20 items-center">
              <aside className="lg:col-span-5">
                <div className="relative rounded-3xl shadow-xl overflow-hidden aspect-[3/3.5] group">
                  <Image
                    src={aboutImages[currentAboutImage]}
                    alt="Alex Ferraro - Professional UGC Creator specializing in men's content"
                    width={500}
                    height={600}
                    className="w-full h-full object-cover transition-opacity duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

                  {/* Navigation arrows */}
                  <button
                    onClick={() =>
                      setCurrentAboutImage(
                        (prev) =>
                          (prev - 1 + aboutImages.length) % aboutImages.length
                      )
                    }
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white/30"
                    aria-label="Previous image"
                  >
                    <ArrowRight className="w-5 h-5 text-white rotate-180" />
                  </button>

                  <button
                    onClick={() =>
                      setCurrentAboutImage(
                        (prev) => (prev + 1) % aboutImages.length
                      )
                    }
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white/30"
                    aria-label="Next image"
                  >
                    <ArrowRight className="w-5 h-5 text-white" />
                  </button>

                  {/* Dots indicators */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {aboutImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentAboutImage(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === currentAboutImage
                            ? "bg-white w-6"
                            : "bg-white/50 hover:bg-white/70"
                        }`}
                        aria-label={`View image ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </aside>

              <article className="lg:col-span-7 space-y-12">
                <header className="space-y-8">
                  <h2 className="text-[3rem] lg:text-[4rem] font-black leading-[0.9] tracking-tight">
                    HI! I'M ALEX
                  </h2>
                  <div className="text-xl lg:text-2xl font-light italic text-black/70 tracking-wide">
                    HERE'S A LITTLE ABOUT ME AND WHAT I'M ALL ABOUT!
                  </div>
                </header>

                <div className="space-y-8 text-lg lg:text-xl leading-relaxed text-black/70 font-light">
                  <p>
                    I'm a <strong>bilingual UGC creator</strong> bringing
                    authentic voices to both Italian and North American markets.
                    With my genuine Italian accent and real talk approach, I
                    craft <em>user-generated content</em> that truly resonates
                    with diverse audiences.
                  </p>
                  <p>
                    Instead of making ads that look like ads, I create{" "}
                    <strong>
                      UGC content that feels like a recommendation from a friend
                    </strong>{" "}
                    — natural, relatable, and impossible to scroll past. Brands
                    in <strong>men's care</strong>, <strong>tech</strong>, and{" "}
                    <strong>fashion</strong> have seen real engagement and
                    conversions thanks to my storytelling-first style.
                  </p>
                  <p>
                    Oh, and I'm also a web developer — which means I'm not just
                    in the tech world, I live and breathe it. Whether it's
                    emerging trends, digital experiences, or product features, I
                    know how to communicate <strong>tech UGC content</strong> in
                    a way that makes sense (and sells).
                  </p>
                  <p className="font-medium text-black">
                    I'd love to bring my fresh, bilingual perspective to your
                    brand. Let's create something real together!
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-8 pt-8">
                  <div>
                    <div className="text-sm font-medium text-black/60 mb-2">
                      PLATFORMS
                    </div>
                    <div className="space-y-2">
                      <div className="font-medium">TikTok</div>
                      <div className="font-medium">Instagram</div>
                      <div className="font-medium">YouTube</div>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-black/60 mb-2">
                      SPECIALTIES
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge
                        variant="secondary"
                        className="bg-black/5 text-black border-0 font-medium"
                      >
                        Men's Care
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="bg-black/5 text-black border-0 font-medium"
                      >
                        Tech
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="bg-black/5 text-black border-0 font-medium"
                      >
                        Fashion
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="bg-black/5 text-black border-0 font-medium"
                      >
                        Lifestyle
                      </Badge>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* Work Section */}
        <section id="work" className="py-32 bg-[#fafafa]">
          <div className="max-w-8xl mx-auto px-6 lg:px-12">
            <header className="text-center mb-20">
              <h2 className="text-[4rem] lg:text-[6rem] font-black leading-[0.9] tracking-tight mb-8">
                CONTENT IN ACTION
              </h2>
              <p className="text-xl lg:text-2xl text-black/60 font-light max-w-3xl mx-auto">
                Recent <strong>UGC work</strong> that's driving real results for
                brands across different verticals.{" "}
                <em>Authentic user-generated content</em> that converts.
              </p>
            </header>

            {/* Video Grid */}
            <div className="grid lg:grid-cols-3 gap-8 mb-20">
              {[
                {
                  videoUrl: "/Ale - Morning skin routine.mp4",
                  title: "Morning Skincare",
                  brand: "L'Oréal",
                  category: "MEN'S CARE UGC",
                },
                {
                  videoUrl: "/Ale - Hair Wax.mp4",
                  title: "Hair Styling",
                  brand: "got2b",
                  category: "LIFESTYLE UGC",
                },
                {
                  videoUrl: "/Ale - Notion 2.mp4",
                  title: "Productivity Setup",
                  brand: "Notion",
                  category: "TECH UGC",
                },
              ].map((video, index) => (
                <article
                  key={index}
                  className="group cursor-pointer max-w-xs mx-auto"
                >
                  <div className="relative aspect-[9/16] bg-black rounded-3xl overflow-hidden mb-6 group-hover:scale-[1.02] transition-transform duration-500">
                    <video
                      ref={(el) => {
                        if (el) videoRefs.current[index] = el;
                      }}
                      src={video.videoUrl}
                      className="w-full h-full object-cover"
                      playsInline
                      onEnded={() => setPlayingVideo(null)}
                      onTimeUpdate={() => handleTimeUpdate(index)}
                      aria-label={`${video.title} UGC video for ${video.brand}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div
                      className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
                      onClick={() => handlePlayPauseClick(index)}
                    >
                      {playingVideo !== index ? (
                        <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-100 group-hover:opacity-100">
                          <Play
                            className="w-8 h-8 text-white ml-1"
                            aria-hidden="true"
                          />
                        </div>
                      ) : (
                        <div className="w-20 h-20 flex items-center justify-center opacity-0">
                          <Pause
                            className="w-8 h-8 text-white"
                            aria-hidden="true"
                          />
                        </div>
                      )}
                    </div>
                    {playingVideo === index && (
                      <div
                        ref={(el) => {
                          progressBarRefs.current[index] = el;
                        }}
                        className="absolute bottom-2 left-4 right-4 h-6 cursor-pointer"
                        onMouseDown={(e) => handleMouseDown(e, index)}
                      >
                        <div className="relative flex h-full w-full items-center">
                          <div className="h-1.5 w-full rounded-full bg-white/30">
                            <div
                              className="relative h-full rounded-full bg-white"
                              style={{ width: `${videoProgress}%` }}
                            >
                              <div className="absolute right-0 top-1/2 h-3.5 w-3.5 -translate-y-1/2 translate-x-1/2 rounded-full bg-white shadow-lg"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="absolute top-6 left-6">
                      <Badge className="bg-white/20 backdrop-blur-sm text-white border-0 font-medium">
                        {video.category}
                      </Badge>
                    </div>
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="text-white">
                        <div className="font-semibold text-lg">
                          {video.title}
                        </div>
                        <div className="text-sm opacity-80">{video.brand}</div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="text-center">
              <Button
                size="lg"
                className="bg-black text-white hover:bg-black/80 rounded-full px-12 py-4 text-base font-medium group"
              >
                VIEW ALL WORK
                <ExternalLink className="ml-2 w-4 h-4 group-hover:scale-110 transition-transform" />
              </Button>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-32 bg-white">
          <div className="max-w-8xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-20">
              <h2 className="text-[4rem] lg:text-[6rem] font-black leading-[0.9] tracking-tight mb-8">
                VIDEO CONTENT PACKAGES
              </h2>
              <p className="text-xl lg:text-2xl text-black/60 font-light max-w-3xl mx-auto">
                Choose the perfect package for your brand's needs
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-12 items-stretch">
              {[
                {
                  title: "STARTER",
                  description: "Quick & Simple",
                  price: "$60",
                  features: [
                    "1 UGC Video (up to 30 seconds)",
                    "Edited for Instagram/Tiktok/Youtube",
                    "3-day delivery",
                    "1 revision",
                    "1 high-quality thumbnail photo",
                    "Organic Social Media Usage: indefinite",
                  ],
                  popular: false,
                },
                {
                  title: "PRO",
                  description: "Engaging & Eye-Catching",
                  price: "$80",
                  features: [
                    "1 UGC Video (up to 60 seconds)",
                    "Edited for Instagram/Tiktok/Youtube",
                    "3-day delivery",
                    "2 revisions",
                    "1 high-quality thumbnail photo",
                    "Organic Social Media Usage: indefinite",
                    "Paid Ads Usage: 3 months",
                    "Website Usage: 4 months",
                  ],
                  popular: true,
                },
                {
                  title: "ELITE",
                  description: "Impactful & Strategic",
                  price: "$100",
                  features: [
                    "1 UGC Video (up to 120 seconds)",
                    "Edited for Instagram/Tiktok/Youtube",
                    "3-day delivery",
                    "3 revisions",
                    "2 high-quality thumbnail photos",
                    "Organic Social Media Usage: indefinite",
                    "Paid Ads Usage: 12 months",
                    "Website Usage: 12 months",
                  ],
                  popular: false,
                },
              ].map((service, index) => (
                <Card
                  key={index}
                  className={`relative overflow-hidden border-2 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] h-full flex flex-col ${
                    service.popular
                      ? "border-black bg-black text-white"
                      : "border-black/10 bg-white hover:border-black/30"
                  }`}
                >
                  {service.popular && (
                    <div className="absolute top-0 left-0 right-0 bg-white text-black text-center py-2 text-sm font-bold">
                      MOST POPULAR
                    </div>
                  )}
                  <CardContent
                    className={`p-12 ${
                      service.popular ? "pt-16" : ""
                    } h-full flex flex-col`}
                  >
                    <div className="flex-1 space-y-8">
                      <div className="space-y-4">
                        <h3 className="text-2xl font-black tracking-tight">
                          {service.title}
                        </h3>
                        <p
                          className={`text-lg font-light ${
                            service.popular ? "text-white/80" : "text-black/60"
                          }`}
                        >
                          {service.description}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <div className="text-5xl font-black">
                          {service.price}
                        </div>
                        <div
                          className={`text-sm font-medium ${
                            service.popular ? "text-white/60" : "text-black/60"
                          }`}
                        >
                          per project
                        </div>
                      </div>

                      <ul className="space-y-4">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start space-x-3">
                            <div
                              className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                                service.popular ? "bg-white" : "bg-black"
                              }`}
                            ></div>
                            <span className="font-medium">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button
                      asChild
                      className={`w-full py-4 text-base font-medium rounded-full transition-all duration-300 mt-8 ${
                        service.popular
                          ? "bg-white text-black hover:bg-white/90"
                          : "bg-black text-white hover:bg-black/80"
                      }`}
                    >
                      <Link href="#contact">GET STARTED</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Add-Ons Section */}
        <section className="pt-28 pb-40 bg-[#fafafa]">
          <div className="max-w-8xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-24">
              <h2 className="text-[3rem] lg:text-[4rem] font-black leading-[0.9] tracking-tight mb-4">
                ADD-ONS
              </h2>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 mb-20">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-black/5">
                <div className="text-center space-y-4">
                  <h3 className="text-xl font-bold">Extra-fast delivery</h3>
                  <div className="text-3xl font-black">$30</div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-black/5">
                <div className="text-center space-y-4">
                  <h3 className="text-xl font-bold">Additional Revision</h3>
                  <div className="text-3xl font-black">$40</div>
                  <div className="text-sm text-black/60">/ 2 days</div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-black/5">
                <div className="text-center space-y-4">
                  <h3 className="text-xl font-bold">Product Photography</h3>
                  <div className="text-3xl font-black">$20</div>
                  <div className="text-sm text-black/60">for 4 photos</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-black/5 text-center">
              <p className="text-lg italic text-black/70">
                <span className="font-bold">Quick fact:</span> Posts featuring
                dogs get <span className="font-bold">up to 69%</span> more
                engagement on Instagram compared to those without; TikToks and
                Reels that feature pets—especially cute, well-behaved dogs—see{" "}
                <span className="font-bold">up to 2x</span> longer average view
                duration; UGC with dogs is{" "}
                <span className="font-bold">3x more</span> likely to be shared
                than similar content without pets
              </p>
            </div>
          </div>
        </section>

        {/* Discounts Section */}
        <section className="pt-28 pb-24 bg-white">
          <div className="max-w-8xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-24">
              <h2 className="text-[3rem] lg:text-[4rem] font-black leading-[0.9] tracking-tight mb-4">
                DISCOUNTS
              </h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 mb-20">
              <div className="bg-black/5 rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-4">Loyalty Discount</h3>
                <p className="text-lg">
                  After 3 projects, receive{" "}
                  <span className="font-bold">20% off</span> the 4th project
                </p>
              </div>

              <div className="bg-black/5 rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-4">Referral Discount</h3>
                <p className="text-lg">
                  <span className="font-bold">10% discount</span> to existing
                  clients that refer new customers
                </p>
              </div>

              <div className="bg-black/5 rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-4">Starter Discount</h3>
                <p className="text-lg">
                  <span className="font-bold">$50</span> for 1 Video Starter
                  Package + 4 product photos
                </p>
              </div>

              <div className="bg-black/5 rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-4">Add-on Discount</h3>
                <p className="text-lg">
                  <span className="font-bold">10% discount</span> on add-ons
                  when purchased with any video package
                </p>
              </div>
            </div>

            <div className="text-center">
              <p className="text-lg italic text-black/60">
                <span className="font-bold">Note:</span> *open to negotiations
                for long-term collaborations
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-32 bg-black text-white">
          <div className="max-w-8xl mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-12 gap-20">
              <div className="lg:col-span-7 space-y-12">
                <div className="space-y-8">
                  <h2 className="text-[3rem] lg:text-[5rem] font-black leading-[0.9] tracking-tight">
                    LET'S WORK TOGETHER
                    <span className="block text-white/60">
                      AND ELEVATE YOUR BRAND!
                    </span>
                  </h2>
                  <p className="text-xl lg:text-2xl font-light text-white/80 max-w-2xl">
                    Ready to create content that converts? Let's discuss your
                    next campaign.
                  </p>
                </div>

                <div className="space-y-8">
                  <Link
                    href="mailto:info@alexmakesugc.com"
                    className="flex items-center space-x-6 hover:opacity-80 transition-opacity"
                  >
                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-semibold text-lg">
                        info@alexmakesugc.com
                      </div>
                      <div className="text-white/60">Email me directly</div>
                    </div>
                  </Link>
                  <Link
                    href="https://wa.me/393398513143"
                    target="_blank"
                    className="flex items-center space-x-6 hover:opacity-80 transition-opacity"
                  >
                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                      <svg
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-lg">
                        +39 339 85 13 143
                      </div>
                      <div className="text-white/60">
                        Message me on WhatsApp
                      </div>
                    </div>
                  </Link>
                  <Link
                    href="https://www.instagram.com/alexmakesugc_/"
                    target="_blank"
                    className="flex items-center space-x-6 hover:opacity-80 transition-opacity"
                  >
                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                      <Instagram className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-semibold text-lg">
                        @ALEXMAKESUGC_
                      </div>
                      <div className="text-white/60">Follow on Instagram</div>
                    </div>
                  </Link>
                  <Link
                    href="https://www.tiktok.com/@alexmakesugc_?is_from_webapp=1&sender_device=pc"
                    target="_blank"
                    className="flex items-center space-x-6 hover:opacity-80 transition-opacity"
                  >
                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                      <svg
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.10z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-lg">
                        @ALEXMAKESUGC_
                      </div>
                      <div className="text-white/60">Follow on TikTok</div>
                    </div>
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="space-y-8">
                  <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                    <h3 className="text-2xl font-bold text-white mb-6">
                      Ready to create together?
                    </h3>
                    <p className="text-lg text-white/80 mb-8">
                      Reach out through any of these channels and let's discuss
                      your next project. I'm always excited to work with new
                      brands and create authentic content that resonates.
                    </p>

                    <div className="space-y-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                          <Mail className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-white">
                          <div className="font-semibold">
                            Quick response guaranteed
                          </div>
                          <div className="text-white/60">
                            Usually within 24 hours
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                          <svg
                            className="w-6 h-6 text-white"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                          </svg>
                        </div>
                        <div className="text-white">
                          <div className="font-semibold">Instant messaging</div>
                          <div className="text-white/60">
                            Real-time conversation
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                          <Instagram className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-white">
                          <div className="font-semibold">Behind the scenes</div>
                          <div className="text-white/60">
                            See my latest work
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-[#fafafa] py-12 border-t border-black/5">
          <div className="max-w-8xl mx-auto px-6 lg:px-12">
            <div className="flex flex-col lg:flex-row justify-between items-center">
              <div className="text-center lg:text-left mb-4 lg:mb-0">
                <a
                  href="https://www.instagram.com/alexmakesugc_/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl font-black tracking-tight hover:opacity-80 transition-opacity duration-200"
                >
                  @ALEXMAKESUGC_
                </a>
              </div>
              <div className="text-black/60 text-sm font-medium">
                © 2024 Alex Ferraro. All rights reserved.
              </div>
              <div className="text-black/60 text-sm font-medium">
                <a
                  href="https://www.afweb.dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-black"
                >
                  Powered by AFWEB.DEV
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
