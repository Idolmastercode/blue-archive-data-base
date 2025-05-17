import React from 'react';
import './StudentCard.css'; // Asegúrate de que este archivo CSS esté actualizado

// URLs para imágenes (Asegúrate de tener estas imágenes en tu carpeta public/images/...)
const starFilledIcon = 'images/icons/star_filled.png';
const attackTypeIconUrl = 'images/icons/attack_icon.jpg'; // Ajusta si son .jpg o la ruta correcta
const armorTypeIconUrl = 'images/icons/armor_icon.jpg';   // Ajusta si son .jpg o la ruta correcta
const uniqueWeaponIndicatorIconUrl = 'images/ue/weapon_icon.png'; // Ruta al icono de Arma Única

// --- URLs para iconos de ROL ---
// Asegúrate de que estas rutas sean correctas y tengas los iconos
const roleIcons = {
  Dealer: 'images/roles/dealer_icon.png',
  Tank: 'images/roles/tank_icon.png',
  Support: 'images/roles/support_icon.png',
  Healer: 'images/roles/healer_icon.png',
  "T.S.": 'images/roles/ts_icon.png', // Clave "T.S." para Tactical Support
  // Añade más roles si es necesario
  Default: 'images/roles/default_role_icon.png' // Un icono por defecto si el rol no se encuentra
};
// --- ---

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

function StudentCard({ student }) {
  // Desestructuración de props con valores por defecto
  const {
    id = 'unknown',
    name = 'Unnamed',
    pictures = {},
    profileData = {},
    uniqueWeapon = {}
  } = student;

  const { avatarUrl = 'images/placeholder_avatar.png' } = pictures; // Placeholder si no hay avatar
  const {
    currentStars = 0,
    attackType = 'N/A',
    armorType = 'N/A',
    combatClass = 'N/A', // Striker o Special
    role = 'N/A'         // Dealer, Tank, T.S., etc.
  } = profileData;

  // Manejador de clic en la tarjeta
  const handleCardClick = () => {
    console.log(`Pro Card clicked: ${name} (ID: ${id})`);
    // Aquí iría la lógica para navegar a la página del estudiante, por ejemplo.
  };

  // Determinar la clase del borde según el combatClass
  let cardContainerClass = 'student-card-pro-container';
  if (combatClass === 'Striker') {
    cardContainerClass += ' pro-border-striker';
  } else if (combatClass === 'Special') {
    cardContainerClass += ' pro-border-special';
  }

  // Referencia al elemento de la tarjeta para el efecto 3D
  const cardRef = React.useRef(null);

  // Efecto de inclinación 3D al mover el ratón
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const { left, top, width, height } = card.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / (width / 2); // Normaliza de -1 a 1
    const y = (e.clientY - top - height / 2) / (height / 2); // Normaliza de -1 a 1
    const rotateY = x * 15; // Grados de rotación en Y
    const rotateX = y * -15; // Grados de rotación en X (invertido para efecto natural)
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
  };

  // Resetear el efecto 3D cuando el ratón sale
  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };

  // Limpiar el string del rol (ej. "Dealer," -> "Dealer", "T.S.," -> "T.S.")
  const cleanRole = role ? String(role).replace(/,$/, '') : 'N/A';
  const roleIconUrl = roleIcons[cleanRole] || roleIcons.Default;

  return (
    <div
      className={cardContainerClass}
      onClick={handleCardClick}
      title={`Ver detalles de ${name} - Rol: ${cleanRole}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      ref={cardRef}
    >
      <div className="student-card-pro">
        <div className="student-avatar-pro-area">
          <img
            src={avatarUrl}
            alt={`${name} Avatar`}
            className="student-avatar-pro"
            loading="lazy" // Carga diferida para imágenes
          />

          {/* Indicador de Rol del Estudiante (IZQUIERDA) */}
          {cleanRole && cleanRole !== 'N/A' && (
            <div className="avatar-indicator-base avatar-role-indicator" title={`Rol: ${cleanRole}`}>
              <img src={roleIconUrl} alt={`${cleanRole} Role`} className="avatar-role-icon-image" />
            </div>
          )}

          {/* Indicador de Arma Única (DERECHA) */}
          {uniqueWeapon && uniqueWeapon.hasUniqueWeapon && (
            <div className="avatar-indicator-base avatar-unique-weapon-indicator" title="Arma Única equipada">
              <img src={uniqueWeaponIndicatorIconUrl} alt="Unique Weapon Equipped" className="avatar-ue-icon-image" />
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

export default StudentCard;