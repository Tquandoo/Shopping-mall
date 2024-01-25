import { FaStar, FaStarHalf } from "react-icons/fa";

export const GenerateStar = ( {star} ) => {
  let orangeStar = Math.floor(star)
  let half = Math.ceil(star) !== Math.floor(star)
  return (
      <>
        {new Array(orangeStar).fill(1).map((item, index) => (
          <FaStar key={index} color='orange'/>
        ))
        }
        {
          half && (
              <FaStarHalf  color='orange'/>
          )
        }

      </>
  )
}