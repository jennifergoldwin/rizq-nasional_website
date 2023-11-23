import Image from "next/image";
import geo from "../../../../public/assets/images/geo.svg";
import { useTranslations } from "next-intl";
const GeoAllocation = () => {
  const t = useTranslations("Overview.Geographical");
  return (
    <div className="mx-6 bg-[#01115E] px-8 py-6 rounded-xl my-6 ">
      <h1 className="text-center text-xl font-semibold pb-8 pt-4">
        {t("title")}
      </h1>
      <div className="flex lg:flex-row flex-col">
        <Image src={geo} alt="geo img" className="w-full lg:w-3/4" />
        <div className="flex lg:flex-col flex-row justify-center lg:justify-start w-full lg:w-1/4">
          <div className="flex items-center">
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="24" cy="24" r="9" fill="white" />
              <g filter="url(#filter0_f_107_5589)">
                <circle cx="24" cy="24" r="9" fill="#4DC2E8" />
              </g>
              <g filter="url(#filter1_f_107_5589)">
                <circle cx="24" cy="24" r="9" fill="#4DC2E8" />
              </g>
              <defs>
                <filter
                  id="filter0_f_107_5589"
                  x="0"
                  y="0"
                  width="48"
                  height="48"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="BackgroundImageFix"
                    result="shape"
                  />
                  <feGaussianBlur
                    stdDeviation="7.5"
                    result="effect1_foregroundBlur_107_5589"
                  />
                </filter>
                <filter
                  id="filter1_f_107_5589"
                  x="0"
                  y="0"
                  width="48"
                  height="48"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="BackgroundImageFix"
                    result="shape"
                  />
                  <feGaussianBlur
                    stdDeviation="7.5"
                    result="effect1_foregroundBlur_107_5589"
                  />
                </filter>
              </defs>
            </svg>
            <p>Europe (5.67%)</p>
          </div>
          <div className="flex items-center">
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="24" cy="24" r="9" fill="white" />
              <g filter="url(#filter0_f_107_5597)">
                <circle cx="24" cy="24" r="9" fill="#53CF60" />
              </g>
              <g filter="url(#filter1_f_107_5597)">
                <circle cx="24" cy="24" r="9" fill="#53CF60" />
              </g>
              <defs>
                <filter
                  id="filter0_f_107_5597"
                  x="0"
                  y="0"
                  width="48"
                  height="48"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="BackgroundImageFix"
                    result="shape"
                  />
                  <feGaussianBlur
                    stdDeviation="7.5"
                    result="effect1_foregroundBlur_107_5597"
                  />
                </filter>
                <filter
                  id="filter1_f_107_5597"
                  x="0"
                  y="0"
                  width="48"
                  height="48"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="BackgroundImageFix"
                    result="shape"
                  />
                  <feGaussianBlur
                    stdDeviation="7.5"
                    result="effect1_foregroundBlur_107_5597"
                  />
                </filter>
              </defs>
            </svg>

            <p>Asia (25.96%)</p>
          </div>
          <div className="flex items-center">
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="24" cy="24" r="9" fill="white" />
              <g filter="url(#filter0_f_107_5593)">
                <circle cx="24" cy="24" r="9" fill="#FE8C75" />
              </g>
              <g filter="url(#filter1_f_107_5593)">
                <circle cx="24" cy="24" r="9" fill="#FE8C75" />
              </g>
              <defs>
                <filter
                  id="filter0_f_107_5593"
                  x="0"
                  y="0"
                  width="48"
                  height="48"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="BackgroundImageFix"
                    result="shape"
                  />
                  <feGaussianBlur
                    stdDeviation="7.5"
                    result="effect1_foregroundBlur_107_5593"
                  />
                </filter>
                <filter
                  id="filter1_f_107_5593"
                  x="0"
                  y="0"
                  width="48"
                  height="48"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="BackgroundImageFix"
                    result="shape"
                  />
                  <feGaussianBlur
                    stdDeviation="7.5"
                    result="effect1_foregroundBlur_107_5593"
                  />
                </filter>
              </defs>
            </svg>

            <p>North America (68.37%)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeoAllocation;
