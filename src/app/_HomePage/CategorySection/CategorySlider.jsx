'use client'

import React from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


import { useState } from 'react'

import MenuItem from '@/components/MenuItem/MenuItem'

import navLeftSVG from '/public/svgs/navLeft.svg'
import navRightSVG from '/public/svgs/navRight.svg'

import Image from 'next/image'

export default function CategorySlider({data}) {
  const settings = {
    className: "center",
    infinite: false,
    slidesToShow: 5,
    swipeToSlide: false,
    afterChange: function(index) {
      console.log(
        `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
      );
    }
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
      {data.map((item , index) => {
        return (
          <div className="w-full h-full p-0 box-border" key={index}>
            <MenuItem data={item}  isSlider={true}/>
          </div>
        )
      })}
      </Slider>
    </div>
  );
}