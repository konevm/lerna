import aloeCucumber from "../../images/products/aloeCucumber.png";
import nightSerum from "../../images/products/nightSerum.png";
import rosePetal from "../../images/products/rosePetal.png";
import skinBrightening from "../../images/products/skinBrightening.png";
import sunProtection from "../../images/products/sunProtection.png";
import wand from "../../images/products/wand.png";
import { IProduct } from "./interfaces";

export const Products: IProduct[] = [
  {
    id: 1,
    imageURL: rosePetal,
    name: "Hydrating Rose Petal Face Mist",
    description:
      "Crafted from rose, hibiscus, and witch hazel, this face mist provides your skin with smoothing moisture. Its antioxidant-rich floral blend helps fight free radicals, minimizes the look of wrinkles while toning, brightening, protecting and ridding your skin of excess oil.",
    new: false,
    sale: true,
    price: 7.94,
  },
  {
    id: 2,
    imageURL: nightSerum,
    name: "Rejuvenation & Repair Night Serum",
    description:
      "We call this luxe face oil the Sleeping Beauty of serums - Your skin has its very own circadian rhythm - going from a protective state during the day to a regenerative mode at night. Kal Hans crafted the Rejuvenation and Repair Night Serum to enhance the reparative process when the skin is at its most absorptive state. Active healing ingredients such as Rosehip, Seabuckthorn, Jojoba, & Pomegranate, at optimal ratios, brighten, renew, repair, protect, and tone your skin - leaving your skin feeling soft and luminous.",
    new: false,
    sale: true,
    price: 47.99,
  },
  {
    id: 3,
    imageURL: wand,
    name: "Kansa Wand",
    description:
      "Your night time serum or moisturizer's BFF - The Kansa Wanda works to tone, tighten and firm skin whilst de-stressing and relaxing you - increasing blood circulation to your face and leaving your skin plump and dewy. ",
    new: false,
    sale: false,
    price: 32.45,
  },
  {
    id: 4,
    imageURL: aloeCucumber,
    name: "Aloe Cucumber Mist",
    description:
      "This cooling hydrating mist with Niacinamide and Green Tea exfoliates away excess oil, dirt, and debris while balancing your skin's oil production for the optimal level of hydration and plumpness without drying it out. Just one spritz of this Aloe Cucumber Face Mist, leaves skin clearer and oil free with smaller-looking pores.",
    new: true,
    sale: true,
    price: 5.52,
  },
  {
    id: 5,
    imageURL: skinBrightening,
    name: "Skin Brightening Under Eye Cream",
    description:
      "This lightweight multifunctional hydrating eye cream tackles dark circles (hyper-pigmentation), wrinkles and puffiness, all at once. Formulated with Licorice, nature's most potent skin brightener, and Ashwagandha, a rich antioxidant adaptogen, our cream soothes stressed skin and lifts the under-eye area for a more youthful glow - giving your eyes the well rested, look you’ve always dreamed of!",
    new: true,
    sale: false,
    price: 32.8,
  },
  {
    id: 6,
    imageURL: sunProtection,
    name: "Daily Moisture Sun Protection Lotion",
    description:
      "Our 3-in-one cream protects, brightens and moisturizes skin for a luminous radiance. This light weight formulation effortlessly absorbs into skin without leaving a trace while giving you a daily dose of revitalizing moisture and helping protect it from the sun and pollution. The rich natural ingredients in this multi-functional cream also helps reduce signs of aging, protects from tanning and enhances your skin's optimal health, leaving it soft and dewy. Because, who said you can't have it all?",
    new: false,
    sale: false,
    price: 13.46,
  },
];
