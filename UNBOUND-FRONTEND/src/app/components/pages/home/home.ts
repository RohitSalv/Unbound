import { Component } from '@angular/core';
import { Navbar } from "../../reuse/navbar/navbar";
import { Hero } from "../../sections/hero/hero";
import { Features } from "../../sections/features/features";
import { HowItWorks } from "../../sections/how-it-works/how-it-works";
import { ContentPreview } from "../../sections/content-preview/content-preview";
import { SocialProof } from "../../sections/social-proof/social-proof";
import { Faq } from "../../sections/faq/faq";
import { FinalCta } from "../../sections/final-cta/final-cta";

@Component({
  selector: 'app-home',
  imports: [Navbar, Hero, Features, HowItWorks, ContentPreview, SocialProof, Faq, FinalCta],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
