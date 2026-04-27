import { useState } from 'react';
import Dropdown from '../ui/Dropdown';
import type { Option } from '../../lib/type';

export default function TopHeading() {
  const [language, setLanguage] = useState('en');
  const [currency, setCurrency] = useState('usd');
  return (
    <div className="bg-primary text-[#ffffff] flex items-center justify-between">
      <div className="md:w-[70%] w-[95%] mx-auto flex items-center justify-between py-2">
        {/* left part */}
        <div>
          <p className="md:text-xs text-[10px]">
            Welcome to Clicon online eCommerce store.{' '}
          </p>
        </div>

        {/* right part */}
        <div className="flex items-center justify-end">
          <Socials />
          <Dropdown
            label=""
            value={language}
            options={languages}
            onChange={setLanguage}
            className="text-xs p-0"
          />

          <Dropdown
            label=""
            value={currency}
            options={currencies}
            onChange={setCurrency}
            className="text-xs p-0"
          />
        </div>
      </div>
    </div>
  );
}

function Socials() {
  return (
    <>
      <div className="flex items-center justify-center gap-2.5">
        <p className="md:text-xs text-[10px] text-nowrap">Follow us:</p>

        <div className="flex items-center justify-center md:gap-2.5 gap-1.5">
          <svg
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="md:size-3.5 size-3"
          >
            <path
              d="M5.032 14.502c6.038 0 9.34-5.005 9.34-9.345q0-.213-.01-.425A6.7 6.7 0 0 0 16 3.032a6.5 6.5 0 0 1-1.885.516 3.3 3.3 0 0 0 1.443-1.816 6.6 6.6 0 0 1-2.084.797A3.284 3.284 0 0 0 7.88 5.524a9.32 9.32 0 0 1-6.767-3.431 3.3 3.3 0 0 0-.444 1.65c0 1.14.58 2.146 1.46 2.735a3.26 3.26 0 0 1-1.486-.411v.042a3.285 3.285 0 0 0 2.633 3.22 3.3 3.3 0 0 1-1.482.056 3.29 3.29 0 0 0 3.066 2.281 6.6 6.6 0 0 1-4.077 1.406q-.393 0-.783-.045a9.3 9.3 0 0 0 5.032 1.475"
              fill="#fff"
            />
          </svg>

          <svg
            className="md:size-3.5 size-3"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#a)">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0"
                fill="#fff"
              />
              <path
                d="M9.041 15.933v-6.18h1.744l.231-2.176H9.041l.003-1.089c0-.567.054-.871.87-.871h1.09V3.44H9.26c-2.095 0-2.832 1.055-2.832 2.83v1.306H5.122v2.176h1.306v6.092a8 8 0 0 0 2.613.088"
                fill="#1b6392"
              />
            </g>
            <defs>
              <clipPath id="a">
                <path fill="#fff" d="M0 0h16v16H0z" />
              </clipPath>
            </defs>
          </svg>

          <svg
            className="md:size-3.5 size-3"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#a)">
              <path
                d="M7.024.053C4.365.35 1.716 2.501 1.606 5.573c-.068 1.877.464 3.285 2.25 3.68.775-1.367-.25-1.669-.41-2.657C2.793 2.543 8.122-.22 10.91 2.609c1.93 1.959.66 7.986-2.452 7.36-2.981-.599 1.459-5.396-.92-6.338-1.934-.766-2.962 2.341-2.045 3.885C4.954 10.17 3.797 12.67 4.265 16c1.52-1.103 2.033-3.215 2.453-5.418.764.464 1.172.947 2.146 1.022 3.595.278 5.602-3.588 5.112-7.155C13.54 1.287 10.384-.32 7.024.053"
                fill="#fff"
              />
            </g>
            <defs>
              <clipPath id="a">
                <path fill="#fff" d="M0 0h16v16H0z" />
              </clipPath>
            </defs>
          </svg>

          <svg
            className="md:size-3.5 size-3"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#a)">
              <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16" fill="#fff" />
              <path
                d="M13.336 8a1.17 1.17 0 0 1-.648 1.064 2 2 0 0 1 0 .352c0 1.792-2.088 3.248-4.664 3.248S3.36 11.208 3.36 9.416a2 2 0 0 1 0-.352 1.169 1.169 0 1 1 1.288-1.912 5.7 5.7 0 0 1 2.294-.911q.41-.067.826-.073l.592-2.776a.247.247 0 0 1 .296-.192l1.96.392a.8.8 0 1 1-.104.488L8.8 3.72l-.52 2.496a5.7 5.7 0 0 1 3.08.984 1.167 1.167 0 0 1 1.976.8m-7.94 1.106a.801.801 0 1 0 1.48-.614.801.801 0 0 0-1.48.614m4.583 1.92a.216.216 0 0 0-.148-.37.26.26 0 0 0-.159.056A2.62 2.62 0 0 1 8 11.2a2.6 2.6 0 0 1-1.664-.504.216.216 0 0 0-.304.304 3.07 3.07 0 0 0 1.976.616 3.1 3.1 0 0 0 1.53-.336q.234-.12.446-.28zm-.147-1.362a.8.8 0 0 0 .808-.832.8.8 0 1 0-.8.8z"
                fill="#1b6392"
              />
            </g>
            <defs>
              <clipPath id="a">
                <path fill="#fff" d="M0 0h16v16H0z" />
              </clipPath>
            </defs>
          </svg>

          <svg
            className="md:size-3.5 size-3"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m8.354 13.502-3.277-.06c-1.062-.02-2.125.021-3.166-.195C.33 12.924.217 11.339.1 10.01a22.7 22.7 0 0 1 .206-5.625c.173-1.04.85-1.66 1.898-1.728 3.538-.245 7.1-.216 10.63-.101.373.01.748.067 1.116.133 1.815.318 1.859 2.113 1.977 3.625a20.5 20.5 0 0 1-.157 4.58c-.18 1.256-.524 2.309-1.976 2.41-1.82.133-3.598.24-5.423.206 0-.008-.01-.008-.016-.008m-1.927-3.18 4.08-2.343c-1.373-.787-2.716-1.56-4.08-2.343z"
              fill="#fff"
            />
          </svg>

          <svg
            className="md:size-3.5 size-3"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#a)">
              <path
                d="M5.6 8a2.4 2.4 0 1 1 4.8 0 2.4 2.4 0 0 1-4.8 0M4.304 8a3.697 3.697 0 1 0 7.394 0 3.697 3.697 0 0 0-7.394 0m6.677-3.844a.864.864 0 1 0 .864-.863.864.864 0 0 0-.864.863m-5.889 9.705c-.702-.032-1.083-.15-1.337-.248a2.2 2.2 0 0 1-.828-.539 2.2 2.2 0 0 1-.538-.827c-.1-.254-.216-.635-.248-1.337-.035-.76-.042-.987-.042-2.91s.007-2.15.042-2.91c.032-.702.15-1.082.248-1.337.13-.336.286-.576.538-.828a2.2 2.2 0 0 1 .828-.538c.254-.1.635-.216 1.337-.248.76-.035.987-.042 2.91-.042 1.921 0 2.15.008 2.91.042.701.032 1.082.15 1.336.248.336.13.576.287.828.538.253.252.408.492.539.829.099.253.216.635.248 1.337.035.76.042.986.042 2.91 0 1.922-.007 2.15-.042 2.909-.032.702-.15 1.083-.248 1.337a2.2 2.2 0 0 1-.539.828 2.2 2.2 0 0 1-.828.538c-.253.099-.635.216-1.337.248-.759.035-.987.042-2.91.042-1.922 0-2.15-.007-2.909-.042M5.031.844c-.766.035-1.29.156-1.747.334-.473.184-.875.43-1.275.83-.401.4-.647.802-.83 1.276-.179.458-.3.981-.335 1.748S.8 6.045.8 8s.008 2.2.044 2.968.156 1.29.334 1.748c.184.474.43.876.83 1.276.401.4.802.646 1.276.83.458.178.981.3 1.748.334.768.035 1.013.044 2.968.044s2.201-.008 2.969-.044c.766-.035 1.29-.156 1.748-.334.473-.184.874-.43 1.275-.83s.646-.803.83-1.276c.179-.458.3-.981.335-1.748.035-.768.043-1.013.043-2.968s-.008-2.2-.043-2.968-.156-1.29-.334-1.748a3.5 3.5 0 0 0-.83-1.275 3.5 3.5 0 0 0-1.276-.831c-.458-.178-.982-.3-1.748-.334C10.202.809 9.956.8 8.001.8s-2.2.008-2.969.044"
                fill="#fff"
              />
            </g>
            <defs>
              <clipPath id="a">
                <path fill="#fff" d="M0 0h16v16H0z" />
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="mx-2 h-8 w-px shrink-0 bg-background/25 ml-6"
      />
    </>
  );
}

const languages: Option[] = [
  { value: 'en', label: 'Eng' },
  { value: 'bn', label: 'Bng' },
  { value: 'es', label: 'Esp' },
];

const currencies: Option[] = [
  { value: 'usd', label: 'USD' },
  { value: 'eur', label: 'EUR' },
  { value: 'gbp', label: 'GBP' },
];
