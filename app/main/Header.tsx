import Link from "next/link";
import { FlippingLink } from "../components/flippingLink/FlippingLink";

export const Header = () => {
    return (
        <header className="header fixed top-0 left-0 right-0 p-2 grid grid-cols-2 gap-4">
            <nav className="header__navbar col-start-2 flex items-center justify-between font-m">
                <FlippingLink href='#projects'>projects</FlippingLink>
                <FlippingLink href='#skills'>skills</FlippingLink>
                <FlippingLink href='#process'>process</FlippingLink>
                <FlippingLink href='#about'>about</FlippingLink>
                <FlippingLink href='#contact'>contact</FlippingLink>
                <button>
                    Peepee poopoo
                </button>
            </nav>
        </header>
    )
};
