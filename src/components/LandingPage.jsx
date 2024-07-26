import BackgroundVideo from "./BackgroundVideo"
import NavbarLandingPage from "./NavbarLandingPage"
import HereSection from "./HeroSection"
import SectionOne from "./SectionOne"
import SectionTwo from "./SectionTwo"
import FunfactSection from "./FunFactsSection"

function LandingPage () {
    return (
        <div>
            <BackgroundVideo  />
            <NavbarLandingPage />
            <HereSection />
            <SectionOne></SectionOne>
            <FunfactSection />
            <SectionTwo></SectionTwo>

        </div>
    )
}

export default LandingPage