import { Hero } from "@/components/sections/main/Hero";
import { Advantages } from "@/components/sections/main/Advantages";
import { ScrollDots } from "@/components/ui/navigation/ScrollDots";

export const MainPage = () => {
  return (
    <>
      <section id="hero">
        <Hero />
      </section>

      <section id="advantages">
        <Advantages />
      </section>

      <ScrollDots />
    </>
  );
};
