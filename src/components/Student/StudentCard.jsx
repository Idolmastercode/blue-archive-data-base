import React from 'react';
// Asegúrate que el nombre del archivo CSS sea el que estás usando,
// si es StudentCard.css o StudentCard_Square.css
import './StudentCard.css'; 

// URLs para imágenes (Asegúrate de tener estas imágenes en tu carpeta public/images/...)
const starFilledIcon = 'images/icons/star_filled.png';
const attackTypeIconUrl = 'images/icons/attack_icon.jpg'; // Cambiado a .png por consistencia, ajusta si son .jpg
const armorTypeIconUrl = 'images/icons/armor_icon.jpg';   // Cambiado a .png, ajusta si son .jpg
const uniqueWeaponIndicatorIconUrl = 'images/ue/weapon_icon.png'; // Icono para el indicador de UE

const StarRatingSquare = ({ rating }) => {
  const stars = Array(rating).fill(null);
  return (
    <div className="star-rating-pro"> {/* Manteniendo tu clase "star-rating-pro" */}
      {stars.map((_, index) => (
        <img key={`star-${index}`} src={starFilledIcon} alt="★" className="star-icon-pro" />
      ))}
    </div>
  );
};

function StudentCard_Square({ student }) {
  // Asegúrate de extraer 'uniqueWeapon' de las props de student
  const { id = 'unknown', name = 'Unnamed', pictures = {}, profileData = {}, uniqueWeapon = {} } = student; 
  const { avatarUrl = 'images/placeholder_avatar.png' } = pictures;
  const {
    currentStars = 0,
    attackType = 'N/A',
    armorType = 'N/A',
    combatClass = 'N/A',
  } = profileData;

  const handleCardClick = () => {
    console.log(`Pro Card clicked: ${name} (ID: ${id})`);
    // Futura navegación
  };

  let cardContainerClass = 'student-card-pro-container';
  if (combatClass === 'Striker') {
    cardContainerClass += ' pro-border-striker';
  } else if (combatClass === 'Special') {
    cardContainerClass += ' pro-border-special';
  }

  const cardRef = React.useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const { left, top, width, height } = card.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / (width / 2);
    const y = (e.clientY - top - height / 2) / (height / 2);
    const rotateY = x * 15;
    const rotateX = y * -15;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };

  return (
    <div
      className={cardContainerClass}
      onClick={handleCardClick}
      title={`Ver detalles de ${name}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      ref={cardRef}
    >
      <div className="student-card-pro">
        <div className="student-avatar-pro-area"> {/* Este necesita position: relative */}
          <img
            src={avatarUrl}
            alt={`${name} Avatar`}
            className="student-avatar-pro"
            loading="lazy"
          />
          {/* Icono de arma única DENTRO del área del avatar */}
          {uniqueWeapon && uniqueWeapon.hasUniqueWeapon && (
            <div className="avatar-unique-weapon-indicator">
              <img src={uniqueWeaponIndicatorIconUrl} alt="Unique Weapon Equipped" className="avatar-ue-icon" />
            </div>
          )}
        </div>
        <div className="student-info-pro-area">
          <h3 className="student-name-pro">{name}</h3>
          <StarRatingSquare rating={currentStars} />
          <div className="types-tags-pro-group">
            <span className={`type-tag-pro attack-type-${attackType?.toLowerCase()}`}>
              <img src={attackTypeIconUrl} alt="Attack" className="type-tag-icon" />
              {attackType}
            </span>
            <span className={`type-tag-pro armor-type-${armorType?.toLowerCase()}`}>
              <img src={armorTypeIconUrl} alt="Armor" className="type-tag-icon" />
              {armorType}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentCard_Square;