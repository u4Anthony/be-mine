"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";

const YES_IMAGES = [
  "/img/yes/tomHeart.gif",
];

const NO_IMAGES = [
  "/img/no/sadPatrick.gif",
  "/img/no/angryFerg.gif"
];

const YES_RESPONSE = [
  "HIP HIP HOORAY! Happy Valentines! ❤️",
  "OMG you said yes! Happy Valentines! ❤️",
  "YIPEEEEEEEE!! Happy Valentines! ❤️",
  "You're the best, Happy Valentines! ❤️",
  "My heart is doing backflips right now! 💝",
  "This is the BEST Valentine's Day ever! 💖",
  "I'm floating on cloud nine! Thank you! 💗",
  "My heart just skipped a beat! You're amazing! 💓",
  "Is this real life? Because it feels like a dream! 💘",
  "Time to do my happy dance! 💃💕",
  "You just made my whole year! 🥰",
  "I can't stop smiling! You're wonderful! 😊❤️",
  "This is better than chocolate! (And that's saying something!) 🍫💝",
  "My heart is bursting with joy! 💖✨",
  "You had me at 'Yes'! 🥰💘",
  "Queue the love songs! 🎵❤️",
  "Best. Decision. Ever! 🌟💖",
  "I'm over the moon right now! 🌙💕",
  "Time to celebrate with heart-shaped everything! 💝🎉",
  "This calls for a love-themed party! 🎊❤️"
];

const NO_RESPONSE = [
  "This breaks my heart... 💔",
  "Was that a misclick? 🖱️",
  "I must not be good enough... 😢",
  "Are you sure? 🥺",
  "I'll wait for you to change your mind... ⏳",
  "My heart just shattered into a million pieces 💔",
  "Time to listen to sad love songs on repeat 🎵",
  "Plot twist I wasn't expecting... 😢",
  "Guess I'll just hug my pillow instead 🛏️",
  "*dramatically falls to knees* WHYYYYY? 😭",
  "Is it because I didn't buy enough chocolate? 🍫",
  "My teddy bear will never reject me like this 🧸",
  "Loading broken_heart.exe... 💔",
  "I promise I'll learn better dad jokes! 🃏",
  "Time to eat ice cream and watch rom-coms alone 🍦",
  "Okay, but what if I learned to juggle? 🤹‍♂️",
  "Error 404: Valentine not found 😢",
  "My diary's gonna hear about this... 📔",
  "Maybe next year... *sighs dramatically* 📅",
  "I'll just high-five myself then... ✋",
  "Fine, I'll share my chocolates with my cat instead 😿",
  "Current status: Building a blanket fort of sadness 🏰",
  "BRB, googling 'how to handle rejection' 🔍",
  "Well, this is awkward... 😅",
  "I guess we'll always have the friend zone 🤷‍♂️"
];

export default function Home() {
  const [response, setresponse] = useState<'yes' | 'no' | null>(null);

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
  }, []);

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

  const getRandomImage = (images: string[]) => {
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  }

  const getRandomText = (responses: string[]) => {
    const randomIndex = Math.floor(Math.random() * responses.length);
    return responses[randomIndex];
  }

  const handleResponse = (answer: 'yes' | 'no' | null) => {
    setresponse(answer);
  };


  return (
    <div className="h-screen w-screen bg-gradient-to-t from-red-200 via-pink-400 to-rose-600">
      <div id="petals" className="z-0"/>
      <main className="relative z-[2]">
        <div className="flex flex-row min-h-screen justify-center items-center">
          {response  === null ? (
            <div className="flex flex-col items-center min-h-screen justify-center">
              <Image
                src={"/img/cuteLook.jpeg"}
                alt="cute look"
                width={200}
                height={200}
                className="rounded-lg shadow-lg mb-4"
              />
              <div className="divide-y divide-gray-200 overflow-hidden rounded-lg backdrop-blur-sm bg-white/30 shadow">
                <div className="px-4 py-5 sm:p-6> text-black text-center">Will You Be My Valentine?</div>
                <div className="px-4 py-4 sm:px-6 space-x-4 flex justify-center">
                  <button 
                    className="w-24 rounded-md bg-emerald-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={() => handleResponse('yes')}
                    >
                    Yes
                  </button>
                  <button 
                    className="w-24 rounded-md bg-red-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={() => handleResponse('no')}
                    >
                    No
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center">
              {response === 'yes' ? (
                <div className="flex flex-col items-center">
                  <Image
                    src={getRandomImage(YES_IMAGES)}
                    alt="Happy Valentines"
                    width={400}
                    height={400}
                    className="rounded-lg shadow-lg mb-4"
                  />
                  <p className="text-black text-xl font-bold">
                    {getRandomText(YES_RESPONSE)}
                  </p>
                  <button 
                  className="w-24 rounded-md bg-red-600 px-2.5 py-1.5 mt-4 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={() => handleResponse(null)}
                  >
                  Change of Heart? 😢
                </button>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <Image
                    src={getRandomImage(NO_IMAGES)}
                    alt="Sad Valentines"
                    width={400}
                    height={400}
                    className="rounded-lg shadow-lg mb-4"
                  />
                  <p className="text-black text-xl font-bold">
                    {getRandomText(NO_RESPONSE)}
                  </p>
                  <button 
                  className="w-24 rounded-md bg-emerald-600 px-2.5 py-1.5 mt-4 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={() => handleResponse(null)}
                  >
                    Change of Heart? 😀
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
