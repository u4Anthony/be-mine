"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { genLink } from "../utils/linkgen";
import gsap from "gsap";


export default function CreateValentinePage() {
    const[name, setName] = useState("");
    const[valentineName, setValentineName] = useState("");
    const[email, setEmail] = useState("");
    const[generatedLink, setGeneratedLink] = useState("");
    const[showCopyToast, setShowCopyToast] = useState(false);

    const random = (min: number, max: number) => min + Math.random() * (max - min);
    
    const animatePetal = (elm: HTMLElement) => {
        gsap.to(elm, {
          y: window.innerHeight + 100,
          duration: random(6, 15),
          ease: "none",
          repeat: -1,
          delay: -15
        });
    
        gsap.to(elm, {
          x: '+=100',
          rotation: random(0, 180),
          duration: random(4, 8),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
    
        gsap.to(elm, {
          rotateX: random(0, 360),
          rotateY: random(0, 360),
          duration: random(2, 8),
          repeat: -1, 
          yoyo: true,
          ease: "sine.inOut",
          delay: -5
        });
    
      }

    useEffect(() => {
        /*
        Original Petal animation by DIACO : twitter.com/Diaco_ml  ||  codepen.io/MAW
        powered by GSAP : https://www.greensock.com/
        */

        // Init GSAP animation
        const total = 30;
        const petalsContainer = document.getElementById("petals");

        if (petalsContainer) {
        gsap.set(petalsContainer, { perspective: 600 });

        // Create petals
        for (let i=0; i<total; i++) {
            const Div = document.createElement('div');
            Div.className = 'dot';
            gsap.set(Div, {
            x: random(0, window.innerWidth),
            y: random(-200, -150),
            z: random(-200, 200)
            });
            petalsContainer.appendChild(Div);
            animatePetal(Div);
        }
        }
    }, [animatePetal]);

    const handleGeneratedLink = () => {
        if (name && valentineName && email) {
            const uniqueLink = genLink(name, valentineName, email);
            setGeneratedLink(`${window.location.origin}${uniqueLink}`);
        }
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(generatedLink);
        setShowCopyToast(true);
        setTimeout(() => setShowCopyToast(false), 3000);

    }

    return (
        <div className="min-h-screen bg-gradient-to-t from-red-200 via-pink-400 to-rose-600 flex items-center justify-center">
            <div id="petals" className="z-0"/>
            <main className="relative z-[2]">
                <div className="bg-white/30 backdrop-blur-sm rounded-lg p8 shadow-lg max-w-md w-full px-6 py-2">
                    <h1 className="text-2xl font-bold mb-2 text-center">Create Your Valentine&apos;s Link</h1>
                    <div className="space-y-4">
                        <input 
                            type="text"
                            placeholder="Your Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-3 rounded-md border text-black"
                        />
                        <input 
                            type="text"
                            placeholder="Valentine's Name"
                            value={valentineName}
                            onChange={(e) => setValentineName(e.target.value)}
                            className="w-full p-3 rounded-md border text-black"
                        />
                        <input 
                            type="email"
                            placeholder="Your Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 rounded-md border text-black"
                        />
                        <button
                            onClick={handleGeneratedLink}
                            className="w-full rounded-md bg-red-600 px-2.5 py-1.5 mt-4 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Generate Personalized Link
                        </button>

                        {generatedLink && (
                            <div className="mt-4 text-center justify-center">
                                <p className="text-2xl font-bold mb-2 text-center">Your Unique Link:</p>
                                <input 
                                    type="text"
                                    readOnly
                                    value={generatedLink}
                                    className="w-full p-2 rounded-md border bg-gray-100 text-black"
                                />
                                <button
                                    onClick={handleCopyLink}
                                    className="mt-2 ml-4 bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-500"
                                >
                                    Copy Link
                                </button>
                            </div>
                        )}

                        {showCopyToast && (
                            <div className="fixed -bottom-12 left-1/2 transform -translate-x-1/2 bg-emerald-500/50 backdrop-blur-sm text-white px-4 py-2 rounded-md">
                                Link Copied to Clipboard!
                            </div>
                        )}

                        <div className="text-center justify-center">
                            <Link
                                href="/valentine"
                                className="text-rose-700:underline rounded-md bg-emerald-600 px-2.5 py-1.5 mt-4 text-sm font-semibold text-white  hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Skip and Use Generic Valentine&apos;s Page
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}