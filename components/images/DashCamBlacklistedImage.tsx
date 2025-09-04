import React from 'react';

export interface DashCamBlacklistedImageProps {
  className?: string;
  width?: number | string;
  height?: number | string;
  alt?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  onLoad?: () => void;
  onError?: () => void;
}

const imageData = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAE4AAAApCAYAAACbWx//AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAT2SURBVHgB7ZrbThtHGMe/2YPt9QEfiSAkdKkEkdJewEUu2ouGR0ifoOoTtH2CKm+QPkF4j1yk5KYXXJQIVYhGVVYREIiNvZi1195jv2+MrVrF9Y4DVbz4J61nvTN7+u/3zXxzYDCCcvn+W4BQhxuDGZIUfFutHu3CFCJddbBQ0PWbFY0I9TBkT2BKkWDGRIwSziRXghsGLW4q3ZRgozLQXQuUqKq7GQTseaWShWw2BZPiuj4cHTVo9xffV57RjmkaBkwpyqgMfCmTkkrlnkH/ZVkCRfkYzw75L2N46SkWrI8iUjgIQnj//hw8z498jiQxKJUykEwK3eqTR+htul2Pp0tLxcjnWFYXWq3u7RZucJKAy8oygzgyJJyu64VWy6X4qtA/FgTSOmMBVKsWF0FRZBDFshywbZfv47U/w3pzE6aMbFbZNQxe73O4OSws6Lrres9xd3PcBTQtga5agKhcXHTg9LQJ8YBtqar89OTEMFhPNP+lqkp6Pp9GZZMjT7NtB5rNjrBwVM/Nz+dgWvH9ABzHg3q9hWFVYORy8oaCov1MopEY49xwEjclei4+vZ0UenZq3DRNhXfvGnqz6f1Ib/Mkn9cmFuU2QRrNzaUwFmXfoXBhgYLbGdGguJSnMGMiZsJNSLzC+RFoWhoWF+9DOp3lm+N0MUJoYUX/F6ZtmITYC/fgwZc4mr2A3UUHg/mAj9IwpqCAedjY+BpHHGrw5s0feNwVum6shXv4cB3j0iIkEgrGYi4cHBgDgdJpDYfOipDL5eDRo29gZ+eVkHixreNWVta4VdEYYqmUx6B9gad92m0bjo+PoVarQafjwOrqFyBCLIWjOm1pSUcr8+H8/GJw/PS0Cq9f78H+/gHun/JjZ2d1FLGN1ldBYSuR7xFLVyUBOh0azmqhQB+4OCTU3t4+z3ccB05OPmCPRoZKpYL5Z2idaewWLmK3qhbpHrG0uGw2z62N3NHzPLSwPwei/RMSj6ByVD6RSEa+h9K7UQ5bnvzYwqZp8Y6uKPRA5XJ0N/hYNE3jKYlB2LZ9Zbl+PkEtLrn4uOe0bZoCaPeEK5fnYXn5Hox/oDOMfU5AFPowy8ufw/9FJjOHbtrhrkj0hGz8q1wikRjsK4rCP/C457QsDyedauJ1nKj1hOE5+NGnKK4F1+3ic6r4wTLQaDSwHiujp9TRWjpD5e7eXeRpPj/HRQ6C6OGIsHDJZELIeoLgEEePo1W41wX1DDIZjVtasVjk4q2traJ4DbTENp+xKxYLPF+SJDSEMqRSKWxQog+4xjYA9rye1c3P97yDxCuVinzro6oqt7pkkhoFf6jOG0dshet2bQwxcmhRKS4eua1ltfB4FwXr1WfkomRpshyiJYoN78e6y9VuX6A1aei2ad4Q9Ftbgv6TRVK91m6LRwqx7+ST5dFGFpZOJ7CDL2GDFaAru2iBFkzKrRhWIqjBoO26wJ4DMx1HbEjltsNYaEr4gxOthxj7eDDjv2m1bCCtaHma5HnK96bZNF+8eIXx1hnMuBrSZnv7NxLP8H35KZ+yoaWrsuy/jLJ89c6dMjx+/BVEhb7Qzs7Urh8cgjH4tWdohsEbh8v1aiso4LqquuujTgwCRnk/gDjbkhRuwRTjuuou6jSwgKFW9TJjpHlcLpaZQDj2tlo93IIYMZsenBChxWu0Lhjrwt9Fl/KHYfhTvX70DGLE30zY/bnn5OP3AAAAAElFTkSuQmCC";

export const DashCamBlacklistedImage: React.FC<DashCamBlacklistedImageProps> = ({
  className,
  width,
  height,
  alt = "Dash Cam - Blacklisted.png",
  style,
  onClick,
  onLoad,
  onError,
  ...props
}) => {
  return (
    <img
      src={imageData}
      alt={alt}
      className={className}
      width={width}
      height={height}
      style={style}
      onClick={onClick}
      onLoad={onLoad}
      onError={onError}
      {...props}
    />
  );
};

export default DashCamBlacklistedImage;
