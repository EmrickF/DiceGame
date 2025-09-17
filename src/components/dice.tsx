"use client";
import React from 'react'
import { motion } from 'framer-motion'
type DiceThings = {
  value: number | null
  rolling: boolean
}

export default function Dice({ value, rolling }: DiceThings) {
  if (value === null) {
    return <span className="text-gray-400 text-4xl">X</span>
  }

  let animateConfig
  let transitionConfig

  if (rolling) {
    animateConfig = { rotate: [0, 720], scale: [1, 1.3, 1] }
    transitionConfig = { duration: 1}
  } else {
    animateConfig = { rotate: 0, scale: 1 }
    transitionConfig = {}
  }

  return (
    <motion.img
      src={`/die.${value}.png`}
      animate={animateConfig}
      transition={transitionConfig}
    />
  )
}
