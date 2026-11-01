import { BikeFinderTeaser } from "@/components/home/BikeFinderTeaser";
import { BrandGrid } from "@/components/home/BrandGrid";
import { MergedCategoryGrid } from "@/features/catalog/MergedCatalogViews";
import { FaqSection } from "@/components/home/FaqSection";
import { HeroSection } from "@/components/home/HeroSection";
import { HowItWorks } from "@/components/home/HowItWorks";
import { ModelRail } from "@/components/home/ModelRail";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { ProductRail } from "@/components/home/ProductRail";
import { PurchaseModes } from "@/components/home/PurchaseModes";
import { ReviewGrid } from "@/components/home/ReviewGrid";
import { SellerPromo } from "@/components/home/SellerPromo";
import { TrustSection } from "@/components/home/TrustSection";
import { catalogService } from "@/services/adapters/catalog";

export function HomePage() {
  const brands = catalogService.listBrands();
  const models = catalogService.listModels();
  const categories = catalogService.listCategories();
  const featured = catalogService.listFeaturedProducts().slice(0, 4);
  const newest = catalogService.listNewProducts().slice(0, 4);
  const bestSelling = catalogService.listBestSellingProducts().slice(0, 4);

  return (
    <>
      <HeroSection brands={brands} />
      <BikeFinderTeaser />
      <BrandGrid brands={brands} />
      <ModelRail models={catalogService.listPopularModels()} brands={brands} />
      <MergedCategoryGrid />
      <ProductRail
        eyebrow="Featured"
        title="Featured parts"
        description="Selected service items from the mock catalog. Every card shows classification, fitment, and Price on Request."
        products={featured}
        categories={categories}
        models={models}
      />
      <ProductRail
        eyebrow="Just in"
        title="Newly added products"
        description="Fresh SKUs added to the prototype catalog. Availability is illustrative mock status."
        products={newest}
        categories={categories}
        models={models}
      />
      <ProductRail
        eyebrow="Most requested"
        title="Best-selling products"
        description="Frequently requested parts in the mock dataset. Popularity is not a live sales rank."
        products={bestSelling}
        categories={categories}
        models={models}
      />
      <TrustSection />
      <HowItWorks steps={catalogService.listQuotationSteps()} />
      <PurchaseModes />
      <SellerPromo />
      <ReviewGrid reviews={catalogService.listReviews()} />
      <FaqSection faqs={catalogService.listFaqs()} />
      <NewsletterSection />
    </>
  );
}
