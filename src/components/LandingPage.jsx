import BackgroundVideo from "./BackgroundVideo"
import NavbarLandingPage from "./NavbarLandingPage"
import HereSection from "./HeroSection"
import SectionOne from "./SectionOne"
import SectionTwo from "./SectionTwo"
import FunfactSection from "./FunFactsSection"
import TestimonialSection from "./TestimonialSection"
import TeamsLogoSwiper from "./TeamsLogoSwiper"

function LandingPage () {
    return (
        <div>
            <BackgroundVideo  />
            <NavbarLandingPage />
            <HereSection />
            <SectionOne></SectionOne>
            <FunfactSection />
            <SectionTwo></SectionTwo>
            <TestimonialSection></TestimonialSection>
            <TeamsLogoSwiper />

        </div>
    )
}

export default LandingPage