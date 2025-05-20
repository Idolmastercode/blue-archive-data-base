import React from 'react';
import './StudentCard.css';

// --- Definición de Rutas para Iconos y Recursos ---
const starFilledIcon = 'images/icons/star_filled.png';
const attackTypeIconUrl = 'images/icons/attack_icon.jpg';
const armorTypeIconUrl = 'images/icons/armor_icon.jpg';
const uniqueWeaponIndicatorIconUrl = 'images/ue/weapon_icon.png';

const roleIcons = {
  Dealer: 'images/roles/dealer_icon.png',
  Tank: 'images/roles/tank_icon.png',
  Support: 'images/roles/support_icon.png',
  Healer: 'images/roles/healer_icon.png',
  "T.S.": 'images/roles/ts_icon.png',
  Default: 'images/roles/default_role_icon.png'
};
// --- Fin de Definición de Rutas ---

// --- Componente Auxiliar para Mostrar Calificación por Estrellas ---
const StarRatingSquare = ({ rating }) => {
  const stars = Array(rating).fill(null);
  return (
    <div className="star-rating-pro">
      {stars.map((_, index) => (
        <img key={`star-${index}`} src={starFilledIcon} alt="★" className="star-icon-pro" />
      ))}
    </div>
  );
};
// --- Fin de Componente StarRatingSquare ---

// --- Componente Principal: StudentCard ---
function StudentCard({ student }) {
  // --- Desestructuración de Props y Valores por Defecto ---
  const {
    id = 'unknown',
    name = 'Unnamed',
    pictures = {},
    profileData = {},
    uniqueWeapon = {}
  } = student;

  const { avatarUrl = 'images/placeholder_avatar.png' } = pictures;
  const {
    currentStars = 0,
    attackType = 'N/A',
    armorType = 'N/A',
    combatClass = 'N/A',
    role = 'N/A'
  } = profileData;

  // --- Manejadores de Eventos de la Tarjeta ---
  const handleCardClick = () => {
    console.log(`Pro Card clicked: ${name} (ID: ${id})`);
    // Lógica para navegación o acciones al hacer clic
  };

  // --- Lógica para Efecto 3D de Inclinación con el Mouse ---
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
  // --- Fin de Lógica para Efecto 3D ---

  // --- Preparación de Datos para Visualización ---
  let cardContainerClass = 'student-card-pro-container';
  if (combatClass === 'Striker') {
    cardContainerClass += ' pro-border-striker';
  } else if (combatClass === 'Special') {
    cardContainerClass += ' pro-border-special';
  }

  const cleanRole = role ? String(role).replace(/,$/, '') : 'N/A';
  const roleIconUrl = roleIcons[cleanRole] || roleIcons.Default;

  // --- Estructura JSX del Componente StudentCard ---
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
        {/* Sección del Avatar e Indicadores */}
        <div className="student-avatar-pro-area">
          <img
            src={avatarUrl}
            alt={`${name} Avatar`}
            className="student-avatar-pro"
            loading="lazy"
          />

          {cleanRole && cleanRole !== 'N/A' && (
            <div className="avatar-indicator-base avatar-role-indicator" title={`Rol: ${cleanRole}`}>
              <img src={roleIconUrl} alt={`${cleanRole} Role`} className="avatar-role-icon-image" />
            </div>
          )}

          {uniqueWeapon && uniqueWeapon.hasUniqueWeapon && (
            <div className="avatar-indicator-base avatar-unique-weapon-indicator" title="Arma Única equipada">
              <img src={uniqueWeaponIndicatorIconUrl} alt="Unique Weapon Equipped" className="avatar-ue-icon-image" />
            </div>
          )}
        </div>

        {/* Sección de Información del Estudiante */}
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
// --- Fin de Componente StudentCard ---

export default StudentCard;