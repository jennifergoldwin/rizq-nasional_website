"use client";

import UserDetails from "@/components/overview/user";
import React from "react";
import "chart.js/auto";

import { Line, Chart, Doughnut } from "react-chartjs-2";
import GeoAllocation from "@/components/overview/geoAllocation";
import AssetsAllocation from "@/components/overview/assetsAllocation";
const labels = ["January", "February", "March", "April", "May", "June", "July"];
const Page = () => {
  const getGradient = (ctx: any, chartArea: any) => {
    var gradient = ctx.createLinearGradient(
      0,
      chartArea.bottom,
      0,
      chartArea.top
    );
    gradient.addColorStop(0, "rgba(1,17,94,1)");
    gradient.addColorStop(1, "rgba(72,104,215,0)");

    return gradient;
  };

  const data = {
    labels,
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: (context: any) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          // This case happens on initial chart load
          if (!chartArea) return;
          return getGradient(ctx, chartArea);
        },
        borderColor: "#4DC2E8", // Border color (white in this example)
        borderWidth: 3,
        fill: true,
      },
    ],
  };
  return (
    <main className="min-h-screen md:pl-64 w-full">
      <div className="max-w-screen-2xl md:max-w-screen-xl mx-auto h-full w-full">
        <UserDetails />
        <div className="flex lg:flex-row flex-col w-full">
          <div className="w-full lg:w-2/5">
            <div className="bg-[#01115E] px-8 py-6 rounded-xl my-6 mx-6 flex flex-col justify-center items-center">
              <h1 className="text-center text-xl font-semibold pb-8 pt-4">
                Investment Summary
              </h1>
              <svg
                width="280"
                height="250"
                viewBox="0 0 310 310"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M111.464 166L105.928 156.656H101.8V166H99.56V143.632H106.28C108.776 143.632 110.664 144.229 111.944 145.424C113.245 146.619 113.896 148.187 113.896 150.128C113.896 151.749 113.427 153.136 112.488 154.288C111.571 155.419 110.205 156.155 108.392 156.496L114.152 166H111.464ZM101.8 154.832H106.312C108.061 154.832 109.373 154.405 110.248 153.552C111.144 152.699 111.592 151.557 111.592 150.128C111.592 148.656 111.165 147.525 110.312 146.736C109.459 145.925 108.115 145.52 106.28 145.52H101.8V154.832ZM140.197 143.92V166H137.957V148.368L130.085 166H128.453L120.581 148.432V166H118.341V143.92H120.709L129.253 163.056L137.797 143.92H140.197ZM149.247 154.096C147.924 153.669 146.911 152.997 146.207 152.08C145.524 151.163 145.183 150.053 145.183 148.752C145.183 147.6 145.471 146.576 146.047 145.68C146.644 144.763 147.508 144.048 148.639 143.536C149.769 143.003 151.124 142.736 152.703 142.736C154.281 142.736 155.636 143.003 156.767 143.536C157.897 144.048 158.751 144.763 159.327 145.68C159.924 146.576 160.223 147.6 160.223 148.752C160.223 150.032 159.871 151.141 159.167 152.08C158.484 153.019 157.481 153.691 156.159 154.096C157.609 154.459 158.751 155.152 159.583 156.176C160.415 157.2 160.831 158.448 160.831 159.92C160.831 161.285 160.489 162.48 159.807 163.504C159.145 164.507 158.196 165.285 156.959 165.84C155.743 166.395 154.324 166.672 152.703 166.672C151.081 166.672 149.652 166.395 148.415 165.84C147.199 165.285 146.249 164.507 145.567 163.504C144.905 162.48 144.575 161.285 144.575 159.92C144.575 158.448 144.991 157.2 145.823 156.176C146.655 155.152 147.796 154.459 149.247 154.096ZM158.047 149.008C158.047 147.6 157.567 146.512 156.607 145.744C155.647 144.976 154.345 144.592 152.703 144.592C151.06 144.592 149.759 144.976 148.799 145.744C147.839 146.491 147.359 147.579 147.359 149.008C147.359 150.331 147.849 151.387 148.831 152.176C149.812 152.965 151.103 153.36 152.703 153.36C154.303 153.36 155.593 152.965 156.575 152.176C157.556 151.387 158.047 150.331 158.047 149.008ZM152.703 155.088C150.953 155.088 149.524 155.483 148.415 156.272C147.305 157.061 146.751 158.256 146.751 159.856C146.751 161.392 147.284 162.597 148.351 163.472C149.417 164.347 150.868 164.784 152.703 164.784C154.516 164.784 155.956 164.347 157.023 163.472C158.089 162.576 158.623 161.371 158.623 159.856C158.623 158.277 158.068 157.093 156.959 156.304C155.871 155.493 154.452 155.088 152.703 155.088ZM177.952 148.656C177.482 145.883 175.872 144.496 173.12 144.496C171.029 144.496 169.461 145.307 168.416 146.928C167.37 148.549 166.89 151.205 166.976 154.896C167.402 153.616 168.213 152.613 169.408 151.888C170.624 151.141 172.01 150.768 173.568 150.768C175.808 150.768 177.578 151.461 178.88 152.848C180.202 154.213 180.864 156.101 180.864 158.512C180.864 159.92 180.586 161.2 180.032 162.352C179.498 163.483 178.666 164.389 177.536 165.072C176.426 165.755 175.04 166.096 173.376 166.096C170.197 166.096 168 165.083 166.784 163.056C165.589 161.029 164.992 158.16 164.992 154.448C164.992 146.555 167.701 142.608 173.12 142.608C175.168 142.608 176.778 143.173 177.952 144.304C179.125 145.413 179.818 146.864 180.032 148.656H177.952ZM173.152 152.688C172.149 152.688 171.2 152.891 170.304 153.296C169.408 153.701 168.672 154.32 168.096 155.152C167.541 155.963 167.264 156.965 167.264 158.16C167.264 159.888 167.776 161.328 168.8 162.48C169.824 163.632 171.317 164.208 173.28 164.208C174.922 164.208 176.234 163.707 177.216 162.704C178.197 161.701 178.688 160.336 178.688 158.608C178.688 156.752 178.208 155.301 177.248 154.256C176.288 153.211 174.922 152.688 173.152 152.688ZM184.893 154.32C184.893 150.651 185.458 147.803 186.589 145.776C187.719 143.749 189.746 142.736 192.669 142.736C195.591 142.736 197.618 143.749 198.749 145.776C199.879 147.803 200.444 150.651 200.444 154.32C200.444 158.053 199.879 160.944 198.749 162.992C197.618 165.04 195.591 166.064 192.669 166.064C189.725 166.064 187.687 165.04 186.557 162.992C185.447 160.944 184.893 158.053 184.893 154.32ZM198.237 154.32C198.237 152.336 198.098 150.661 197.821 149.296C197.543 147.931 196.999 146.832 196.189 146C195.378 145.168 194.205 144.752 192.669 144.752C191.133 144.752 189.959 145.168 189.149 146C188.338 146.832 187.794 147.931 187.516 149.296C187.239 150.661 187.101 152.336 187.101 154.32C187.101 156.368 187.239 158.085 187.516 159.472C187.794 160.837 188.338 161.936 189.149 162.768C189.959 163.6 191.133 164.016 192.669 164.016C194.205 164.016 195.378 163.6 196.189 162.768C196.999 161.936 197.543 160.837 197.821 159.472C198.098 158.085 198.237 156.368 198.237 154.32ZM204.611 154.32C204.611 150.651 205.177 147.803 206.307 145.776C207.438 143.749 209.465 142.736 212.387 142.736C215.31 142.736 217.337 143.749 218.467 145.776C219.598 147.803 220.163 150.651 220.163 154.32C220.163 158.053 219.598 160.944 218.467 162.992C217.337 165.04 215.31 166.064 212.387 166.064C209.443 166.064 207.406 165.04 206.275 162.992C205.166 160.944 204.611 158.053 204.611 154.32ZM217.955 154.32C217.955 152.336 217.817 150.661 217.539 149.296C217.262 147.931 216.718 146.832 215.907 146C215.097 145.168 213.923 144.752 212.387 144.752C210.851 144.752 209.678 145.168 208.867 146C208.057 146.832 207.513 147.931 207.235 149.296C206.958 150.661 206.819 152.336 206.819 154.32C206.819 156.368 206.958 158.085 207.235 159.472C207.513 160.837 208.057 161.936 208.867 162.768C209.678 163.6 210.851 164.016 212.387 164.016C213.923 164.016 215.097 163.6 215.907 162.768C216.718 161.936 217.262 160.837 217.539 159.472C217.817 158.085 217.955 156.368 217.955 154.32Z"
                  fill="white"
                />
                <path
                  d="M218.172 264.019C222.049 270.709 219.791 279.346 212.747 282.536C186.576 294.387 157.272 297.945 128.827 292.532C95.7779 286.242 66.0991 268.263 45.2213 241.883C24.3434 215.503 13.6628 182.488 15.1339 148.878C16.4001 119.95 26.5954 92.2475 44.1418 69.4983C48.864 63.3759 57.7886 63.1621 63.4091 68.4719C69.0296 73.7817 69.1989 82.5983 64.6313 88.8369C51.6252 106.601 44.0789 127.901 43.1071 150.102C41.9303 176.99 50.4748 203.403 67.177 224.506C83.8793 245.61 107.622 259.994 134.061 265.025C155.892 269.18 178.356 266.729 198.633 258.151C205.754 255.139 214.296 257.329 218.172 264.019Z"
                  fill="white"
                />
                <g filter="url(#filter0_f_97_90)">
                  <path
                    d="M218.172 264.019C222.049 270.709 219.791 279.346 212.747 282.536C186.576 294.387 157.272 297.945 128.827 292.532C95.7779 286.242 66.0991 268.263 45.2213 241.883C24.3434 215.503 13.6628 182.488 15.1339 148.878C16.4001 119.95 26.5954 92.2475 44.1418 69.4983C48.864 63.3759 57.7886 63.1621 63.4091 68.4719C69.0296 73.7817 69.1989 82.5983 64.6313 88.8369C51.6252 106.601 44.0789 127.901 43.1071 150.102C41.9303 176.99 50.4748 203.403 67.177 224.506C83.8793 245.61 107.622 259.994 134.061 265.025C155.892 269.18 178.356 266.729 198.633 258.151C205.754 255.139 214.296 257.329 218.172 264.019Z"
                    fill="#53CF60"
                  />
                </g>
                <g filter="url(#filter1_f_97_90)">
                  <path
                    d="M218.172 264.019C222.049 270.709 219.791 279.346 212.747 282.536C186.576 294.387 157.272 297.945 128.827 292.532C95.7779 286.242 66.0991 268.263 45.2213 241.883C24.3434 215.503 13.6628 182.488 15.1339 148.878C16.4001 119.95 26.5954 92.2475 44.1418 69.4983C48.864 63.3759 57.7886 63.1621 63.4091 68.4719C69.0296 73.7817 69.1989 82.5983 64.6313 88.8369C51.6252 106.601 44.0789 127.901 43.1071 150.102C41.9303 176.99 50.4748 203.403 67.177 224.506C83.8793 245.61 107.622 259.994 134.061 265.025C155.892 269.18 178.356 266.729 198.633 258.151C205.754 255.139 214.296 257.329 218.172 264.019Z"
                    fill="#53CF60"
                  />
                </g>
                <path
                  d="M47.5924 89.1242C41.0014 85.0818 38.8816 76.4105 43.5619 70.2559C52.8328 58.0647 64.0613 47.4515 76.819 38.8633C93.4567 27.6631 112.307 20.1685 132.093 16.8868C151.879 13.6051 172.139 14.613 191.502 19.8422C206.349 23.852 220.402 30.2719 233.113 38.8173C239.529 43.1314 240.322 52.0227 235.389 57.9765C230.456 63.9304 221.67 64.6731 215.147 60.5208C205.605 54.446 195.174 49.8371 184.201 46.8738C168.711 42.6904 152.503 41.8841 136.674 44.5094C120.845 47.1348 105.765 53.1305 92.4552 62.0907C83.0268 68.4377 74.6423 76.1672 67.5721 84.9974C62.7394 91.033 54.1835 93.1667 47.5924 89.1242Z"
                  fill="white"
                />
                <g filter="url(#filter2_f_97_90)">
                  <path
                    d="M47.5924 89.1242C41.0014 85.0818 38.8816 76.4105 43.5619 70.2559C52.8328 58.0647 64.0613 47.4515 76.819 38.8633C93.4567 27.6631 112.307 20.1685 132.093 16.8868C151.879 13.6051 172.139 14.613 191.502 19.8422C206.349 23.852 220.402 30.2719 233.113 38.8173C239.529 43.1314 240.322 52.0227 235.389 57.9765C230.456 63.9304 221.67 64.6731 215.147 60.5208C205.605 54.446 195.174 49.8371 184.201 46.8738C168.711 42.6904 152.503 41.8841 136.674 44.5094C120.845 47.1348 105.765 53.1305 92.4552 62.0907C83.0268 68.4377 74.6423 76.1672 67.5721 84.9974C62.7394 91.033 54.1835 93.1667 47.5924 89.1242Z"
                    fill="#4DC2E8"
                  />
                </g>
                <g filter="url(#filter3_f_97_90)">
                  <path
                    d="M47.5924 89.1242C41.0014 85.0818 38.8816 76.4105 43.5619 70.2559C52.8328 58.0647 64.0613 47.4515 76.819 38.8633C93.4567 27.6631 112.307 20.1685 132.093 16.8868C151.879 13.6051 172.139 14.613 191.502 19.8422C206.349 23.852 220.402 30.2719 233.113 38.8173C239.529 43.1314 240.322 52.0227 235.389 57.9765C230.456 63.9304 221.67 64.6731 215.147 60.5208C205.605 54.446 195.174 49.8371 184.201 46.8738C168.711 42.6904 152.503 41.8841 136.674 44.5094C120.845 47.1348 105.765 53.1305 92.4552 62.0907C83.0268 68.4377 74.6423 76.1672 67.5721 84.9974C62.7394 91.033 54.1835 93.1667 47.5924 89.1242Z"
                    fill="#4DC2E8"
                  />
                </g>
                <path
                  d="M221.138 47.7536C225.196 41.1725 233.873 39.0739 240.016 43.7692C256.793 56.592 270.502 73.084 280.051 92.0529C291.704 115.203 296.702 141.134 294.488 166.957C292.275 192.78 282.937 217.482 267.514 238.311C254.876 255.378 238.56 269.296 219.846 279.077C212.993 282.658 204.8 279.114 201.921 271.938C199.042 264.762 202.581 256.685 209.342 252.934C223.282 245.198 235.46 234.548 245.011 221.649C257.349 204.985 264.82 185.224 266.591 164.566C268.362 143.907 264.363 123.163 255.041 104.642C247.824 90.3061 237.637 77.7383 225.216 67.7433C219.192 62.8959 217.079 54.3348 221.138 47.7536Z"
                  fill="white"
                />
                <g filter="url(#filter4_f_97_90)">
                  <path
                    d="M221.138 47.7536C225.196 41.1725 233.873 39.0739 240.016 43.7692C256.793 56.592 270.502 73.084 280.051 92.0529C291.704 115.203 296.702 141.134 294.488 166.957C292.275 192.78 282.937 217.482 267.514 238.311C254.876 255.378 238.56 269.296 219.846 279.077C212.993 282.658 204.8 279.114 201.921 271.938C199.042 264.762 202.581 256.685 209.342 252.934C223.282 245.198 235.46 234.548 245.011 221.649C257.349 204.985 264.82 185.224 266.591 164.566C268.362 143.907 264.363 123.163 255.041 104.642C247.824 90.3061 237.637 77.7383 225.216 67.7433C219.192 62.8959 217.079 54.3348 221.138 47.7536Z"
                    fill="#4768D7"
                  />
                </g>
                <g filter="url(#filter5_f_97_90)">
                  <path
                    d="M221.138 47.7536C225.196 41.1725 233.873 39.0739 240.016 43.7692C256.793 56.592 270.502 73.084 280.051 92.0529C291.704 115.203 296.702 141.134 294.488 166.957C292.275 192.78 282.937 217.482 267.514 238.311C254.876 255.378 238.56 269.296 219.846 279.077C212.993 282.658 204.8 279.114 201.921 271.938C199.042 264.762 202.581 256.685 209.342 252.934C223.282 245.198 235.46 234.548 245.011 221.649C257.349 204.985 264.82 185.224 266.591 164.566C268.362 143.907 264.363 123.163 255.041 104.642C247.824 90.3061 237.637 77.7383 225.216 67.7433C219.192 62.8959 217.079 54.3348 221.138 47.7536Z"
                    fill="#4768D7"
                  />
                </g>
                <defs>
                  <filter
                    id="filter0_f_97_90"
                    x="0"
                    y="49.6854"
                    width="235.055"
                    height="260.315"
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
                      result="effect1_foregroundBlur_97_90"
                    />
                  </filter>
                  <filter
                    id="filter1_f_97_90"
                    x="0"
                    y="49.6854"
                    width="235.055"
                    height="260.315"
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
                      result="effect1_foregroundBlur_97_90"
                    />
                  </filter>
                  <filter
                    id="filter2_f_97_90"
                    x="26.0415"
                    y="0"
                    width="227.543"
                    height="106.197"
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
                      result="effect1_foregroundBlur_97_90"
                    />
                  </filter>
                  <filter
                    id="filter3_f_97_90"
                    x="26.0415"
                    y="0"
                    width="227.543"
                    height="106.197"
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
                      result="effect1_foregroundBlur_97_90"
                    />
                  </filter>
                  <filter
                    id="filter4_f_97_90"
                    x="185.913"
                    y="26.2306"
                    width="124.087"
                    height="269.257"
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
                      result="effect1_foregroundBlur_97_90"
                    />
                  </filter>
                  <filter
                    id="filter5_f_97_90"
                    x="185.913"
                    y="26.2306"
                    width="124.087"
                    height="269.257"
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
                      result="effect1_foregroundBlur_97_90"
                    />
                  </filter>
                </defs>
              </svg>
              <div className="flex lg:flex-col flex-row py-4">
                <div className="flex items-center">
                  <svg
                    width="45"
                    height="45"
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="24" cy="24" r="9" fill="white" />
                    <g filter="url(#filter0_f_97_80)">
                      <circle cx="24" cy="24" r="9" fill="#4868D7" />
                    </g>
                    <g filter="url(#filter1_f_97_80)">
                      <circle cx="24" cy="24" r="9" fill="#4869D7" />
                    </g>
                    <defs>
                      <filter
                        id="filter0_f_97_80"
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
                          result="effect1_foregroundBlur_97_80"
                        />
                      </filter>
                      <filter
                        id="filter1_f_97_80"
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
                          result="effect1_foregroundBlur_97_80"
                        />
                      </filter>
                    </defs>
                  </svg>
                  <p>Large Cap Funds</p>
                </div>
                <div className="flex items-center">
                  <svg
                    width="45"
                    height="45"
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="24" cy="24" r="9" fill="white" />
                    <g filter="url(#filter0_f_97_79)">
                      <circle cx="24" cy="24" r="9" fill="#4DC2E8" />
                    </g>
                    <g filter="url(#filter1_f_97_79)">
                      <circle cx="24" cy="24" r="9" fill="#4DC2E8" />
                    </g>
                    <defs>
                      <filter
                        id="filter0_f_97_79"
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
                          result="effect1_foregroundBlur_97_79"
                        />
                      </filter>
                      <filter
                        id="filter1_f_97_79"
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
                          result="effect1_foregroundBlur_97_79"
                        />
                      </filter>
                    </defs>
                  </svg>

                  <p>Diversified Funds</p>
                </div>
                <div className="flex items-center">
                  <svg
                    width="45"
                    height="45"
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="24" cy="24" r="9" fill="white" />
                    <g filter="url(#filter0_f_97_84)">
                      <circle cx="24" cy="24" r="9" fill="#53CF60" />
                    </g>
                    <g filter="url(#filter1_f_97_84)">
                      <circle cx="24" cy="24" r="9" fill="#53CF60" />
                    </g>
                    <defs>
                      <filter
                        id="filter0_f_97_84"
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
                          result="effect1_foregroundBlur_97_84"
                        />
                      </filter>
                      <filter
                        id="filter1_f_97_84"
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
                          result="effect1_foregroundBlur_97_84"
                        />
                      </filter>
                    </defs>
                  </svg>

                  <p>Debt Funds</p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-auto lg:w-3/5 m-6">
            <AssetsAllocation />
          </div>
        </div>
        <GeoAllocation />
        <div className="mx-6 my-12 bg-[#01115E] px-8 py-6 rounded-xl">
          <h1 className="text-center text-xl font-semibold pb-8 pt-4">
            Investment Growth
          </h1>
          <Line
            options={{
              responsive: true,
              elements: {
                line: {
                  tension: 0.1,
                },
                point: {
                  radius: 0,
                },
              },
              plugins: {
                legend: {
                  display: false,
                },
                title: {
                  display: false,
                },
              },
            }}
            data={data}
          />
        </div>
      </div>
    </main>
  );
};
export default Page;
