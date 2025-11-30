import React, { useEffect, useRef } from 'react'
import PurpleBtn from '../Components/PurpleBtn';
import TransBtn from '../Components/TransBtn';
import { Link } from 'react-router';

export default function Home() {
  const stepsRef = useRef(null);

  useEffect(() => {
    // Specific observer for steps section
    if (typeof IntersectionObserver !== 'undefined' && stepsRef.current) {
      const stepsObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const stepCards = entry.target.querySelectorAll('.step-card');
              stepCards.forEach((card) => {
                card.classList.add('visible');
              });
            }
          });
        },
        {
          threshold: 0.3,
          rootMargin: '0px 0px -100px 0px'
        }
      );

      stepsObserver.observe(stepsRef.current);

      return () => {
        if (stepsRef.current) {
          stepsObserver.unobserve(stepsRef.current);
        }
      };
    }
  }, []);
  return (
    <div className="flex flex-col gap-4 max-w-dvw">
      <header className="fixed top-0 left-0 w-full z-500 bg-black flex items-center justify-between px-20 py-8 border-b border-b-[#F4AEFF]">
        <div className="flex items-center gap-2">
          <img
            src="/assets/logo.png"
            alt="logo"
            className="w-[25px] h-[25px] "
          />
          <h3 className="">Chaincircle</h3>
        </div>
        <PurpleBtn text={"Sign up for free"} font={"bold"} />
      </header>

      <section className="pt-32 pb-20 px-20 mt-30 relative flex items-center justify-between">
        {/* Hero Text */}
        <div className="flex flex-col gap-10 slide-up">
          <div className="flex flex-col gap-[11px] max-w-[540px]">
            <h2 className="font-bold text-[62px]">
              Save Together, Across <span className="text-primary">Any</span>{" "}
              Chain.
            </h2>
            <p className="font-dm">
              Join savings circles with friends from Ethereum, Solana, Bnb, and
              beyond. No bridging. No friction.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <PurpleBtn
              text={"Start Saving"}
              font={"bold"}
              icon={"rightArrow"}
              to={"layout"}
            />
            <TransBtn 
              text={"How it Works"} 
              icon={"hamburger"} 
              action={() => {
                const element = document.getElementById('how-it-works');
                if (element) {
                  element.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                  });
                }
              }} 
            />
          </div>
        </div>

        {/* Hero Img */}
        <div className="w-[560px] h-[532px] flex items-center justify-center relative">
          <div className="w-[532px] h-[532px] rounded-full flex items-center justify-center relative">
            <img
              src="/assets/Eth.png"
              alt=""
              className="absolute z-[50] left-0 bottom-1/2 translate-y-1/2 -translate-x-1/2 h-[50px] w-[50px] "
            />
            <img
              src="/assets/Bnb.png"
              alt=""
              className="absolute z-[50] top-0 -translate-y-1/2 -translate-x-1/2 h-[50px] w-[50px] "
            />
            <div className="w-[392px] h-[392px] rounded-full flex items-center justify-center relative">
              <img
                src="/assets/Sol.png"
                alt=""
                className="absolute z-[50] right-0 bottom-1/2 translate-y-1/2 translate-x-1/2 h-[50px] w-[50px] "
              />
              <div className="w-[256px] h-[256px] rounded-full flex items-center justify-center relative"></div>
            </div>
          </div>
          {/* Outer circle - SVG */}
          <svg
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            width="532"
            height="532"
          >
            <circle
              cx="266"
              cy="266"
              r="264"
              fill="none"
              stroke="#F4AEFF"
              strokeWidth="2"
              strokeDasharray="20 10"
            />
          </svg>

          {/* Middle circle - SVG */}
          <svg
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            width="392"
            height="392"
          >
            <circle
              cx="196"
              cy="196"
              r="194"
              fill="none"
              stroke="#F4AEFF"
              strokeWidth="2"
              strokeDasharray="20 10"
            />
          </svg>

          {/* Inner circle - SVG */}
          <svg
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            width="256"
            height="256"
          >
            <circle
              cx="128"
              cy="128"
              r="126"
              fill="none"
              stroke="#F4AEFF"
              strokeWidth="2"
              strokeDasharray="20 10"
            />
          </svg>
        </div>

        {/* Mockup */}
        <div className="absolute right-0 bottom-0 slide-in-right">
          <img
            src="/assets/mockup.png"
            className="h-[625px] w-[500px] object-contain z-[20]"
            alt="mockup"
          />
        </div>

        {/* Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-[5] ">
          <img src="/assets/blur.png" alt="" className="w-[650px] h-[550px] " />
        </div>
      </section>

      {/* How it works */}
      <section className="p-20 relative" id="how-it-works">
        {/* Background */}
        <div className="absolute top-20 right-100 w-[350px] h-[350px] -z-[1]">
          <img
            src="/assets/wiw-bg.png"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute -bottom-20 left-0 w-full h-[350px] -z-[1]">
          <img
            src="/assets/Blur-oval.png"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        <h2 className="font-bold text-[62px] max-w-[250px] ">
          {" "}
          How it <span className="text-primary">Works</span> .
        </h2>
        <div className="flex items-end gap-10" ref={stepsRef}>
          {/* Step 1 */}
          <div className="step-card flex-1 h-[289px] rounded-[16px] shadow shadow-[#F4AEFF] relative flex items-center justify-center">
            <div className="flex flex-col gap-2 max-w-[320px] items-center text-center">
              <h3 className="font-bold text-[32px]">Create or Join a Circle</h3>
              <p className="text-primary">Set your savings goal with friends</p>
            </div>
            <img
              src="/assets/Circle-Icon.png"
              alt=""
              className="w-[80px] h-[80px] object-cover absolute top-0 left-1/2 -translate-y-1/2 -translate-x-1/2"
            />
          </div>
          {/* Step 2 */}
          <div className="step-card flex-1 h-[337px] rounded-[16px] shadow shadow-[#F4AEFF] relative flex items-center justify-center">
            <div className="flex flex-col gap-2 max-w-[320px] items-center text-center">
              <h3 className="font-bold text-[32px]">
                Contribute from Any Chain
              </h3>
              <p className="text-primary">
                Pay with ETH, SOL, USDC - whatever you have
              </p>
            </div>
            <img
              src="/assets/Wallet-Icon.png"
              alt=""
              className="w-[80px] h-[80px] object-cover absolute top-0 left-1/2 -translate-y-1/2 -translate-x-1/2"
            />
          </div>
          {/* Step 3 */}
          <div className="step-card flex-1 h-[393px] rounded-[16px] shadow shadow-[#F4AEFF] relative flex items-center justify-center">
            <div className="flex flex-col gap-2 max-w-[320px] items-center text-center">
              <h3 className="font-bold text-[32px]">
                Get Your Payout + Interest
              </h3>
              <p className="text-primary">
                Receive funds when it's your turn, plus earned yield.
              </p>
            </div>
            <img
              src="/assets/Interest-Icon.png"
              alt=""
              className="w-[80px] h-[80px] object-cover absolute top-0 left-1/2 -translate-y-1/2 -translate-x-1/2"
            />
          </div>
        </div>
      </section>
      <section className="relative p-20 flex flex-col  ">
        {/* Background */}
        <div className="absolute top-15 right-0 w-full h-full -z-[1]">
          <img
            src="/assets/Bg-Grid.png"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        <h1 className="font-bold text-[62px] max-w-[330px] mt-20 ">
          Feature <span className="text-primary">Highlights</span>.
        </h1>
      </section>
      <section className="relative p-20 flex justify-center  ">
        {/* Background */}
        <div className="absolute top-0 right-0 w-full h-full -z-[1]">
          <img
            src="/assets/Wave-Loop.png"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        <div className="w-[1000px] relative my-20 grid grid-cols-2 gap-5 ">
          {/* Center */}
          <div className="absolute top-1/2 left-1/2 p-2 -translate-x-[45%] -translate-y-[40%] rounded-full flex items-center justify-center">
            <img
              src="/assets/centre-logo.png"
              alt=""
              className="h-[120px] w-[120px]"
            />
          </div>

          {/* Grid */}
          <div className="shadow shadow-[#F4AEFF] rounded-[16px]  w-full py-[50px] px-[30px] flex items-center gap-[30px] ">
            <img
              src="/assets/padlock.png"
              alt=""
              className="h-[80px] w-[80px] object-cover"
            />
            <div className="">
              <h3 className="font-bold text-[24px] ">Universal Access</h3>
              <p className="text-primary text-[21px] font-dm font-light  ">
                Any wallet, any chain, one circle
              </p>
            </div>
          </div>
          <div className="shadow shadow-[#F4AEFF] rounded-[16px] w-full py-[50px] px-[30px] flex items-center gap-[30px] ">
            <div className="text-right">
              <h3 className="font-bold text-[24px] ">Earn While You Save</h3>
              <p className="text-primary text-[19px] font-dm font-light  ">
                Funds generate 4% APR while waiting
              </p>
            </div>
            <img
              src="/assets/Earn-Icon.png"
              alt=""
              className="h-[80px] w-[80px] object-cover"
            />
          </div>
          <div className="shadow shadow-[#F4AEFF] rounded-[16px] w-full py-[50px] px-[30px] flex items-center gap-[30px] ">
            <img
              src="/assets/Reputation-Icon.png"
              alt=""
              className="h-[80px] w-[80px] object-cover"
            />
            <div className="">
              <h3 className="font-bold text-[24px] ">Build Reputation</h3>
              <p className="text-primary text-[18px] font-dm font-light ">
                Complete circles, unlock better terms
              </p>
            </div>
          </div>
          <div className="shadow shadow-[#F4AEFF] rounded-[16px] w-full py-[50px] px-[30px] flex items-center gap-[30px] ">
            <div className="text-right">
              <h3 className="font-bold text-[24px] ">
                Universal Accountability
              </h3>
              <p className="text-primary text-[21px] font-dm font-light  ">
                Friends keep each other on track
              </p>
            </div>
            <img
              src="/assets/Accountability-Icon.png"
              alt=""
              className="h-[80px] w-[80px] object-cover"
            />
          </div>
        </div>
      </section>

      <section className="pt-[120px] pb-[70px] relative flex flex-col gap-20 ">
        {/* Background */}
        <div className="absolute -top-[4px] left-0 w-full h-full -z-[1]">
          <img
            src="/assets/Blur-oval.png"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        <h1 className="font-bold text-[40px] text-center ">Social Proof</h1>
        <div className="carousel-container h-[167px] flex items-center px-2">
          <div className="carousel-track">
            {/* Original items */}
            <div className="carousel-item shadow shadow-[#F4AEFF] rounded-[16px] w-[400px] h-[135px] p-[30px] flex items-center gap-[17px]">
              <img
                src="/assets/Push-chain-logo.png"
                alt=""
                className="h-full w-[87px]"
              />
              <p className="font-dm">
                Built on{" "}
                <span className="text-primary text-[24px] ">Push Chain</span> -
                The Universal Layer 1
              </p>
            </div>
            <div className="carousel-item shadow shadow-[#F4AEFF] rounded-[16px] w-[400px] h-[135px] p-[30px] flex items-center gap-[17px]">
              <img src="/assets/Badge.png" alt="" className="h-full w-[87px]" />
              <p className="font-dm text-primary">Hackathon Badge</p>
            </div>
            <div className="carousel-item shadow shadow-[#F4AEFF] rounded-[16px] w-[400px] h-[135px] p-[30px] flex items-center gap-[17px]">
              <img
                src="/assets/Objects.png"
                alt=""
                className="h-full w-[87px] "
              />
              <p className="font-dm text-primary">$000 pooled</p>
            </div>
            <div className="carousel-item shadow shadow-[#F4AEFF] rounded-[16px] w-[400px] h-[135px] p-[30px] flex items-center gap-[17px]">
              <img src="/assets/Unity.png" alt="" className="h-full w-[87px]" />
              <p className="font-dm text-primary ">YY circles active</p>
            </div>
            <div className="carousel-item shadow shadow-[#F4AEFF] rounded-[16px] w-[400px] h-[135px] p-[30px] flex items-center gap-[17px]">
              <img
                src="/assets/Push-chain-logo.png"
                alt=""
                className="h-full w-[87px]"
              />
              <p className="font-dm">
                Built on{" "}
                <span className="text-primary text-[24px] ">Push Chain</span> -
                The Universal Layer 1
              </p>
            </div>
            <div className="carousel-item shadow shadow-[#F4AEFF] rounded-[16px] w-[400px] h-[135px] p-[30px] flex items-center gap-[17px]">
              <img src="/assets/Badge.png" alt="" className="h-full w-[87px]" />
              <p className="font-dm text-primary">Hackathon Badge</p>
            </div>
            <div className="carousel-item shadow shadow-[#F4AEFF] rounded-[16px] w-[400px] h-[135px] p-[30px] flex items-center gap-[17px]">
              <img
                src="/assets/Objects.png"
                alt=""
                className="h-full w-[87px] "
              />
              <p className="font-dm text-primary">$000 pooled</p>
            </div>
            <div className="carousel-item shadow shadow-[#F4AEFF] rounded-[16px] w-[400px] h-[135px] p-[30px] flex items-center gap-[17px]">
              <img src="/assets/Unity.png" alt="" className="h-full w-[87px]" />
              <p className="font-dm text-primary ">YY circles active</p>
            </div>

            
          </div>
        </div>
      </section>

      <section className="p-40 flex flex-col items-center gap-30 relative ">
        <div className="flex items-center gap-6 ">
          <p className="w-[356px] font-bold text-[24px] ">
            Stay in the loop with Chaincircle news and updates!
          </p>
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Enter your email"
              className="border border-[#F4AEFF] rounded-[8px] py-[12px] w-[434px] text-center outline-none"
            />
            <PurpleBtn icon={"rightArrow"} />
          </div>
        </div>

        <div className="flex items-center gap-[111px]">
          <h1 className="max-w-[718px] font-bold text-[64px] ">
            <span className="text-primary">“</span>Built for{" "}
            <span className="text-primary"> Push Chain</span> Project G.U.D
            <span className="text-primary">”</span>
          </h1>

          <div className="flex flex-col gap-4 font-dm text-[24px] text-[#707070]">
            <Link>ABOUT</Link>
            <Link>DOCS</Link>
            <Link>GITHUB</Link>
            <Link>X (Twitter)</Link>
          </div>
        </div>

        <div className="flex items-center gap-10">
          <img
            src="/assets/footer-logo.png"
            alt="logo"
            className="w-[200px] h-[200px] "
          />
          <h1 className="text-[120px] ">Chaincircle</h1>
        </div>


        <div className="absolute animate-bounce bottom-20 rounded-[35px] border border-white/20 left-1/2 -translate-x-1/2 h-[130px] w-[900px] bg-white/10 backdrop-blur shadow-lg"></div>

      </section>
    </div>
  );
}
