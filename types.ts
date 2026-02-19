import React from 'react';

export interface Product {
  id: number;
  name: string;
  description: string;
  ingredients: string; // Novo campo
  price: string;
  priceValue: number;
  image: string;
  category: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  avatar: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
  span?: string;
}