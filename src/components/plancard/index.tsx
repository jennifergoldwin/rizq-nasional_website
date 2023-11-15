import Image from "next/image";
import basic from "../../../public/assets/icons/basic.png";
import premium from "../../../public/assets/icons/premium.png";
import standard from "../../../public/assets/icons/standard.png";
import { Plan } from "@/utils/model";
type Props = {
  data: Plan;
};
const PlanCard = (props: Props) => {
  return (
    <div className="bg-[#2D3681] py-8 px-6 my-4 flex justify-center flex-col items-center rounded-3xl w-full">
      <Image
        src={
          props.data.planType === "Basic"
            ? basic
            : props.data.planType === "Premium"
            ? premium
            : standard
        }
        alt={props.data.planType}
      />
      <h1 className="font-bold text-xl my-4">{props.data.planType}</h1>
      <p className="text-white/[0.5] mb-4">{`${props.data.tenure} Days Holding Period`}</p>

      <div>
        <div className="flex items-center">
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="24" cy="24" r="9" fill="white" />
            <g filter="url(#filter0_f_114_15)">
              <circle cx="24" cy="24" r="9" fill="#53CF60" />
            </g>
            <g filter="url(#filter1_f_114_15)">
              <circle cx="24" cy="24" r="9" fill="#53CF60" />
            </g>
            <defs>
              <filter
                id="filter0_f_114_15"
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
                  result="effect1_foregroundBlur_114_15"
                />
              </filter>
              <filter
                id="filter1_f_114_15"
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
                  result="effect1_foregroundBlur_114_15"
                />
              </filter>
            </defs>
          </svg>
          <p>{`Returns ${props.data.interest * 100}%`}</p>
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
            <g filter="url(#filter0_f_114_15)">
              <circle cx="24" cy="24" r="9" fill="#53CF60" />
            </g>
            <g filter="url(#filter1_f_114_15)">
              <circle cx="24" cy="24" r="9" fill="#53CF60" />
            </g>
            <defs>
              <filter
                id="filter0_f_114_15"
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
                  result="effect1_foregroundBlur_114_15"
                />
              </filter>
              <filter
                id="filter1_f_114_15"
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
                  result="effect1_foregroundBlur_114_15"
                />
              </filter>
            </defs>
          </svg>
          <p>{`Withdrawl at any time`}</p>
        </div>
        <p className="text-[#4DC2E8] text-center">
          RM<span className="text-3xl font-semibold">{props.data.price}</span>
        </p>
      </div>
      <button className="text-white bg-[#5A64C3] border-white border-[2px] rounded-lg py-2 px-6 mt-6">
        Invest
      </button>
    </div>
  );
};

export default PlanCard;
