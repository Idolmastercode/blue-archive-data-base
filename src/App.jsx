import { useState, useEffect } from 'react';
import StudentCard from './components/student/StudentCard';
import './App.css';

// --- Iconos Genéricos (¡REEMPLAZA ESTAS RUTAS!) ---
const GENERIC_ATTACK_ICON_URL = 'images/icons/attack_icon.jpg';
const GENERIC_ARMOR_ICON_URL = 'images/icons/armor_icon.jpg';

// --- Definiciones de Temas de Color para Botones ---
const typeRedTheme = {
  baseBgColor: 'rgba(148, 5, 13, 0.5)', baseBorderColor: 'rgba(148, 5, 13, 0.25)',
  activeBgColor: 'rgba(148, 5, 13, 1)', activeBorderColor: 'rgba(108, 0, 6, 1)',
  activeIconOrTextColor: 'white',
  pressedBrightnessFactor: 0.85
};
const typeYellowTheme = {
  baseBgColor: 'rgba(191, 137, 1, 0.5)', baseBorderColor: 'rgba(191, 137, 1, 0.25)',
  activeBgColor: 'rgba(191, 137, 1, 1)', activeBorderColor: 'rgba(152, 113, 9, 1)',
  activeIconOrTextColor: 'white',
  pressedBrightnessFactor: 0.85
};
const typeBlueTheme = {
  baseBgColor: 'rgba(170, 192, 206, 1)', baseBorderColor: 'rgba(34, 111, 156, 0.25)',
  activeBgColor: 'rgba(34, 111, 156, 1)', activeBorderColor: 'rgba(27, 88, 124, 1)',
  activeIconOrTextColor: 'white',
  pressedBrightnessFactor: 0.85
};
const typePurpleTheme = {
  baseBgColor: 'rgba(193, 178, 202, 1)', baseBorderColor: 'rgba(121, 67, 148, 0.25)',
  activeBgColor: 'rgba(121, 67, 148, 1)', activeBorderColor: 'rgba(99, 55, 121, 1)',
  activeIconOrTextColor: 'white',
  pressedBrightnessFactor: 0.85
};
const strikerTheme = {
  baseBgColor: 'rgba(255, 255, 255, 1)', baseBorderColor: 'rgba(239, 80, 49, 0.5)',
  baseIconOrTextColor: 'rgba(239, 80, 49, 0.5)',
  activeBgColor: 'rgba(239, 80, 49, 1)', activeBorderColor: 'rgba(231, 53, 18, 1)',
  activeIconOrTextColor: 'white',
  pressedBrightnessFactor: 0.85
};
const specialClassTheme = {
  baseBgColor: 'rgba(255, 255, 255, 0.5)', baseBorderColor: 'rgba(7, 133, 251, 0.5)',
  baseIconOrTextColor: 'rgba(7, 133, 251, 0.5)',
  activeBgColor: 'rgba(7, 133, 251, 1)', activeBorderColor: 'rgba(3, 113, 215, 1)',
  activeIconOrTextColor: 'white',
  pressedBrightnessFactor: 0.85
};
const roleTheme = {
  baseBgColor: 'rgba(119, 119, 119, 0.25)', baseBorderColor: 'rgba(119, 119, 119, 0.25)',
  baseIconOrTextColor: 'rgba(70, 70, 70, 1)',
  activeBgColor: 'rgba(119, 119, 119, 1)', activeBorderColor: 'rgba(99, 99, 99, 1)',
  activeIconOrTextColor: 'white',
  pressedBrightnessFactor: 0.85
};

// --- Configuración de Opciones para Filtros ---
const attackTypeOptions = [
  { value: 'Explosive', icon: GENERIC_ATTACK_ICON_URL, label: 'Explosivo', theme: typeRedTheme },
  { value: 'Piercing',  icon: GENERIC_ATTACK_ICON_URL, label: 'Penetrante', theme: typeYellowTheme },
  { value: 'Mystic',    icon: GENERIC_ATTACK_ICON_URL, label: 'Místico', theme: typeBlueTheme },
  { value: 'Sonic',     icon: GENERIC_ATTACK_ICON_URL, label: 'Sónico', theme: typePurpleTheme }
];
const armorTypeOptions = [
  { value: 'Light',   icon: GENERIC_ARMOR_ICON_URL, label: 'Ligero', theme: typeRedTheme },
  { value: 'Heavy',   icon: GENERIC_ARMOR_ICON_URL, label: 'Pesado', theme: typeYellowTheme },
  { value: 'Special', icon: GENERIC_ARMOR_ICON_URL, label: 'Especial (Armadura)', theme: typeBlueTheme },
  { value: 'Elastic', icon: GENERIC_ARMOR_ICON_URL, label: 'Elástico', theme: typePurpleTheme }
];
const combatClassOptions = [
  { value: 'Striker', label: 'Striker', theme: strikerTheme },
  { value: 'Special', label: 'Special', theme: specialClassTheme }
];
const roleOptions = [
  { value: 'Dealer',  icon: 'images/roles/dealer_icon.png',  label: 'Dealer', theme: roleTheme },
  { value: 'Tank',    icon: 'images/roles/tank_icon.png',    label: 'Tank', theme: roleTheme },
  { value: 'Support', icon: 'images/roles/support_icon.png', label: 'Support', theme: roleTheme },
  { value: 'Healer',  icon: 'images/roles/healer_icon.png',  label: 'Healer', theme: roleTheme },
  { value: 'T.S.',    icon: 'images/roles/ts_icon.png',      label: 'T.S.', theme: roleTheme }
];

// --- Componente Principal App ---
function App() {
  // --- Estados del Componente ---
  const [sourceStudents, setSourceStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilters, setActiveFilters] = useState({
    attackType: [], armorType: [], combatClass: [], role: []
  });

  // --- Efecto para Carga Inicial de Datos y Ordenamiento ---
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('data/students.json');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        if (!Array.isArray(data)) throw new Error("Fetched data is not an array.");
        const sortedData = [...data].sort((a, b) => {
          if (a.name && b.name) return a.name.localeCompare(b.name);
          return 0;
        });
        setSourceStudents(sortedData);
        setFilteredStudents(sortedData);
      } catch (e) { setError(e.message); console.error("Error fetching student data:", e); }
      finally { setLoading(false); }
    };
    fetchStudents();
  }, []);

  // --- Efecto para Aplicar Filtros Cuando Cambian ---
  useEffect(() => {
    if (loading) return;
    let studentsToFilter = [...sourceStudents];
    const filterableCategories = [
      { key: 'attackType', options: attackTypeOptions, dataProperty: 'attackType' },
      { key: 'armorType', options: armorTypeOptions, dataProperty: 'armorType' },
      { key: 'combatClass', options: combatClassOptions, dataProperty: 'combatClass' },
      { key: 'role', options: roleOptions, dataProperty: 'role', needsCleaning: true }
    ];
    filterableCategories.forEach(category => {
      const selectedValues = activeFilters[category.key];
      if (selectedValues.length > 0 && selectedValues.length < category.options.length) {
        studentsToFilter = studentsToFilter.filter(student => {
          let studentValue = student.profileData?.[category.dataProperty];
          if (category.needsCleaning && studentValue) {
            studentValue = String(studentValue).replace(/,$/, '');
          }
          return selectedValues.includes(studentValue);
        });
      }
    });
    setFilteredStudents(studentsToFilter);
  }, [activeFilters, sourceStudents, loading]);

  // --- Manejadores de Eventos para Filtros ---
  const handleFilterChange = (filterType, value) => {
    setActiveFilters(prevFilters => {
      const currentValues = prevFilters[filterType];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(item => item !== value)
        : [...currentValues, value];
      return { ...prevFilters, [filterType]: newValues };
    });
  };

  const resetFilters = () => {
    setActiveFilters({ attackType: [], armorType: [], combatClass: [], role: [] });
  };

  // --- Lógica de Estilo para Botones de Filtro ---
  const getButtonStyles = (option, isActive, groupType) => {
    const styles = {};
    const theme = option.theme;

    styles['--pressed-brightness-factor'] = (theme && theme.pressedBrightnessFactor) 
        ? theme.pressedBrightnessFactor 
        : 0.85; 

    let iconFilterForCurrentState = 'none'; 

    if (groupType === 'role') {
      if (isActive) {
        iconFilterForCurrentState = 'opacity(1)';
        if (theme && theme.activeIconOrTextColor === 'white') {
          iconFilterForCurrentState = 'opacity(1) grayscale(100%) brightness(0) invert(100%)';
        }
      } else {
        iconFilterForCurrentState = 'opacity(0.5)';
      }
    } else if (option.icon === GENERIC_ATTACK_ICON_URL || option.icon === GENERIC_ARMOR_ICON_URL) {
      // Iconos genéricos de espada/escudo: color natural (blanco), se hacen blancos si el tema activo lo pide (ya lo hacen sus temas)
      if (isActive && theme && theme.activeIconOrTextColor === 'white') {
        iconFilterForCurrentState = 'brightness(0) invert(1)';
      } else {
        iconFilterForCurrentState = 'none'; // Color natural (blanco/gris claro del PNG)
      }
    }
    
    styles['--icon-filter-style'] = iconFilterForCurrentState;

    if (theme) {
      if (isActive) {
        styles.backgroundColor = theme.activeBgColor;
        styles.borderColor = theme.activeBorderColor;
        styles.color = theme.activeIconOrTextColor || 'white'; 
      } else { 
        styles.backgroundColor = theme.baseBgColor; 
        styles.borderColor = theme.baseBorderColor;
        styles.color = theme.baseIconOrTextColor || '#333'; 
      }
    } else { 
      styles.backgroundColor = '#f0f0f0';
      styles.borderColor = '#ccc';
      styles.color = '#555';
      if (isActive) { 
        styles.backgroundColor = roleTheme.activeBgColor; 
        styles.borderColor = roleTheme.activeBorderColor;
        styles.color = roleTheme.activeIconOrTextColor;
        if (roleTheme.activeIconOrTextColor === 'white' && groupType === 'role') { 
             styles['--icon-filter-style'] = 'opacity(1) grayscale(100%) brightness(0) invert(100%)';
        } else if (groupType === 'role') { 
             styles['--icon-filter-style'] = 'opacity(1)';
        }
      }
    }
    return styles;
  };

  // --- Estructura de la Interfaz de Usuario (UI) ---
  return (
    <div className="App">
      <header className="App-header"><h1>Mis estudiantes consentidas</h1></header>

      {!loading && !error && (
        <div className="filter-bar">
          {[
            { type: 'attackType', options: attackTypeOptions, label: 'Ataque' },
            { type: 'armorType', options: armorTypeOptions, label: 'Armadura' },
            { type: 'combatClass', options: combatClassOptions, label: 'Clase', isText: true },
            { type: 'role', options: roleOptions, label: 'Rol' }
          ].map(group => (
            <div className="filter-group" key={group.type} aria-label={`Filtros para ${group.label || group.type}`}>
              {group.options.map(opt => {
                const isActive = activeFilters[group.type].includes(opt.value);
                const buttonStyle = getButtonStyles(opt, isActive, group.type);
                return (
                  <button
                    key={opt.value}
                    onClick={() => handleFilterChange(group.type, opt.value)}
                    className={`filter-button ${group.isText ? 'text-filter' : ''} ${isActive ? 'active-filter' : ''}`}
                    title={opt.label}
                    style={buttonStyle}
                    aria-pressed={isActive}
                  >
                    {group.isText ? opt.label : <img src={opt.icon} alt={opt.label} style={{ filter: buttonStyle['--icon-filter-style'] }} />}
                  </button>
                );
              })}
            </div>
          ))}
          <button onClick={resetFilters} className="reset-filter-button">Reset All</button>
        </div>
      )}

      <main>
        {loading && <p>Cargando estudiantes...</p>}
        {error && <p className="error-message">Error: {error}</p>}
        <div className="student-list">
          {!loading && !error && filteredStudents.length > 0 && (
            filteredStudents.map(student => (
              <div className="student-card" key={student.id}><StudentCard student={student} /></div>
            ))
          )}
          {!loading && !error && filteredStudents.length === 0 && (
            <p>No hay estudiantes que coincidan con los filtros seleccionados.</p>
          )}
        </div>
      </main>

      <footer className="App-footer">
        <p>&copy; {new Date().getFullYear()} Idolmastercode – Blue Archive Fan Project. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;