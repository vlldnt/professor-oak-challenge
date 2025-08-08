
import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import '../../i18n';
import pokemonList from "../../assets/data/pokemonList.json";

import mapIcon from '../../assets/icons/map.png';
import redImg from '../../assets/images/guides/red-en.webp';
import blueImg from '../../assets/images/guides/blue-en.webp';
import route1Map from '../../assets/images/gen_1_routes/route_1_map.png';
import route1 from '../../assets/images/gen_1_routes/route_1.png';
import route22Map from '../../assets/images/gen_1_routes/route_22_map.png';
import route22 from '../../assets/images/gen_1_routes/route_22.png';
import viridianForestMap from '../../assets/images/gen_1_routes/viridian_forest_map.png';
import viridianForest from '../../assets/images/gen_1_routes/viridian_forest.png';
import palletTownMap from '../../assets/images/gen_1_routes/pallet_town_map.png';
import palletTown from '../../assets/images/gen_1_routes/pallet_town.png';
import gameboyImg from '../../assets/images/gameboys/gameboy.png';
import gameboyColorImg from '../../assets/images/gameboys/gameboy-color.png';
import chenImg from '../../assets/images/gameboys/chen.png';

const GuideRedBlue = () => {
  // State pour la version choisie
  const [version, setVersion] = useState('red'); // 'red' ou 'blue'
  // State pour le style de sprite
  const [spriteStyle, setSpriteStyle] = useState('gen3'); // 'gen1', 'gen1-colored', 'gen3'
  const { t, i18n } = useTranslation();
  // State for caught/evolved Pokémon (array of string IDs)
  const [caught, setCaught] = useState(() => {
    const saved = typeof window !== 'undefined' ? window.localStorage.getItem('oak-caught') : null;
    return saved ? JSON.parse(saved) : [];
  });

  // Save to localStorage on change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('oak-caught', JSON.stringify(caught));
    }
  }, [caught]);

  // Toggle caught state for a Pokémon
  const toggleCaught = (id) => {
    setCaught((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    );
  };
  // Helper to get a Pokémon by id
  const getPokemon = (id) => pokemonList.find((p) => p.id === id);

  // Helper pour obtenir le chemin du sprite selon le style choisi
  const getSpritePath = (num) => {
    if (spriteStyle === 'gen1') {
      return `/src/assets/images/pokemons/black_and_white/${num}.png`;
    } else if (spriteStyle === 'gen1-colored') {
      return `/src/assets/images/pokemons/colored/${num}.png`;
    }
    // artwork par défaut
    return `/src/assets/images/pokemons/artwork/${num}.png`;
  };

  // Helper to build evolution chain for a given Pokémon (including only evolutions, not pre-evolutions)
  const buildEvolutionChain = (startId) => {
    const chain = [];
    let current = getPokemon(startId);
    while (current && current.evolution && current.id !== "025") {
      chain.push({
        from: current,
        to: getPokemon(
          pokemonList.find((p) => p.id === current.id).evolution
            ? pokemonList.find((p) => p.id === current.id).evolution.name.en ===
              getPokemon((parseInt(current.id) + 1).toString().padStart(3, "0"))
                .name.en
              ? (parseInt(current.id) + 1).toString().padStart(3, "0")
              : null
            : null
        ),
        evolution: current.evolution,
      });
      current = chain[chain.length - 1].to;
    }
    return chain;
  };

  // Helper to render horizontal evolution card
  const EvolutionCard = ({ startId }) => {
    // Helper pour afficher le taux de capture
    const renderCapture = (poke) => {
      if (!poke.capture_percentage) return null;
      if (
        typeof poke.capture_percentage === "object" &&
        poke.capture_percentage.R !== undefined &&
        poke.capture_percentage.B !== undefined
      ) {
        if (poke.capture_percentage.R !== poke.capture_percentage.B) {
          return (
            <div className="italic font-bold text-[13px] mt-1 text-center w-full">
              <span className="text-red-600">{poke.capture_percentage.R}%</span>
              <span className="mx-1">/</span>
              <span className="text-blue-600">{poke.capture_percentage.B}%</span>
            </div>
          );
        } else {
          return (
            <div className="text-[13px] italic mt-1 text-center w-full">
              <span className="font-mono font-bold italic">
                {poke.capture_percentage.R}%
              </span>
            </div>
          );
        }
      } else {
        return (
          <div className="text-[13px] italic mt-1 text-center w-full">
            <span className="font-mono font-bold italic">
              {poke.capture_percentage}%
            </span>
          </div>
        );
      }
    };

    // Cas spécial Pikachu : affiche juste Pikachu
    if (startId === "025" || startId === 25) {
      const pikachu = getPokemon("025");
      return (
        <div className="flex items-center bg-white rounded-lg p-3 mb-2 overflow-x-auto w-fit ml-0 sm:p-2 sm:mb-1 max-w-full sm:max-w-[98vw]">
          <div className="flex flex-col items-center min-w-[80px] sm:min-w-[56px] relative">
            <img
              src={getSpritePath("025")}
              alt={pikachu.name[i18n.language] || pikachu.name.en}
              className={`h-10 sm:h-16 w-auto cursor-pointer object-contain transition-opacity ${caught.includes('025') ? 'opacity-40' : ''}`}
              onClick={() => toggleCaught('025')}
            />
            {caught.includes('025') && (
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="12" fill="#22c55e"/>
                  <path d="M7 13.5L11 17L17 9.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            )}
            <span className="text-[13px] text-gray-800 sm:text-[15px] text-center mt-1">
              {pikachu.name[i18n.language] || pikachu.name.en}
            </span>
            {renderCapture(pikachu)}
          </div>
        </div>
      );
    }
    // Chaîne d'évolution normale, mais on ignore les évolutions par Pierre Lune
    const chain = buildEvolutionChain(startId).filter(
      (step) =>
        !(
          step.evolution &&
          step.evolution.stone &&
          (step.evolution.stone.fr === "Pierre Lune" ||
            step.evolution.stone.en === "Moon Stone")
        )
    );
    if (!chain.length) {
      // Affiche juste le Pokémon de départ si aucune évolution à afficher
      const poke = getPokemon(startId);
      return (
        <div className="flex items-center bg-white border border-blue-200 rounded-lg p-3 mb-2 overflow-x-auto w-fit ml-0 sm:p-2 sm:mb-1 max-w-full sm:max-w-[98vw]">
          <div className="flex flex-col items-center min-w-[80px] sm:min-w-[56px]">
            <img
              src={getSpritePath(poke.id)}
              alt={poke.name[i18n.language] || poke.name.en}
              className={`h-10 sm:h-16 w-auto cursor-pointer object-contain transition-opacity ${caught.includes(poke.id) ? 'opacity-40' : ''}`}
              onClick={() => toggleCaught(poke.id)}
            />
            <span className="text-[13px] text-gray-800 sm:text-[15px] text-center mt-1">
              {poke.name[i18n.language] || poke.name.en}
            </span>
            {renderCapture(poke)}
          </div>
        </div>
      );
    }
    // Détermine si le dernier Pokémon de la lignée est attrapé
    let lastId = null;
    if (chain.length > 0 && chain[chain.length - 1].to) {
      lastId = chain[chain.length - 1].to.id;
    } else if (chain.length > 0) {
      lastId = chain[chain.length - 1].from.id;
    } else {
      lastId = startId;
    }

    // Gestion starters Bourg Palette : opacifier toute la lignée des starters non choisis
    const starterFamilies = [
      ["001", "002", "003"],
      ["004", "005", "006"],
      ["007", "008", "009"]
    ];
    const allStarterIds = starterFamilies.flat();
    const isPalletStarter = allStarterIds.includes(startId);
    // Trouve le starter choisi (001, 004, 007)
    const chosenStarter = caught.find((id) => ["001", "004", "007"].includes(id));
    // Si on est sur une lignée starter, on détermine si c'est la lignée à opacifier
    let shouldFade = false;
    let shouldBlock = false;
    if (isPalletStarter && chosenStarter) {
      // Cherche la famille du starter courant et du starter choisi
      const thisFamily = starterFamilies.find(fam => fam.includes(startId));
      const chosenFamily = starterFamilies.find(fam => fam.includes(chosenStarter));
      if (thisFamily !== chosenFamily) {
        shouldFade = true;
        shouldBlock = true;
      }
    }

    // Nouvelle logique pour empêcher de dévalider une étape si la suivante est validée
    // Helper pour savoir si toute la chaîne est validée
    const allChainIds = chain.map(step => step.from.id).concat(chain.length > 0 && chain[chain.length - 1].to ? chain[chain.length - 1].to.id : []).filter(Boolean);
    const isFullChainCaught = allChainIds.every(id => caught.includes(id));

    // Custom toggle pour la chaîne d'évolution
    const toggleChainCaught = (id, idx, isTo) => {
      // Si on veut dévalider (retirer) un Pokémon
      if (caught.includes(id)) {
        // Si toute la chaîne est validée
        if (isFullChainCaught) {
          // On ne peut dévalider que la dernière étape
          if (isTo) {
            // Dernier to
            if (idx === chain.length - 1) toggleCaught(id);
          } else {
            // Dernier from
            if (idx === chain.length - 1 && !chain[chain.length - 1].to) toggleCaught(id);
          }
        } else {
          // Si la suivante n'est pas validée, on peut dévalider
          if (isTo) {
            // Pour le dernier to, pas de suivante
            toggleCaught(id);
          } else {
            // Si la suivante (to) n'est pas validée
            if (chain[idx].to && !caught.includes(chain[idx].to.id)) toggleCaught(id);
            // Si la suivante (from) n'est pas validée (pour les étapes intermédiaires)
            else if (chain[idx + 1] && !caught.includes(chain[idx + 1].from.id)) toggleCaught(id);
            // Si pas de suivante, on peut dévalider
            else if (!chain[idx].to && !chain[idx + 1]) toggleCaught(id);
          }
        }
      } else {
        // Ajout classique
        toggleCaught(id);
      }
    };

    return (
      <div className={`flex items-center bg-white rounded-lg p-3 mb-2 overflow-x-auto w-fit ml-0 sm:p-2 sm:mb-1 max-w-full sm:max-w-[98vw] relative ${shouldFade ? 'opacity-30 pointer-events-none' : ''}`}> 
        {chain.map((step, idx) => {
          // Pour chaque étape, on ne peut cliquer que sur le premier ou si le précédent est attrapé
          const canClickFrom = shouldBlock ? false : (idx === 0 || caught.includes(chain[idx - 1].from.id) && (idx === 1 || caught.includes(chain[idx - 1].to?.id)));
          // Pour la dernière évolution
          let canClickTo = false;
          if (idx === chain.length - 1 && step.to) {
            canClickTo = shouldBlock ? false : caught.includes(step.from.id);
          }
          return (
            <React.Fragment key={step.from.id}>
              <div className="flex flex-col items-center min-w-[80px] sm:min-w-[56px] relative">
                <img
                  src={getSpritePath(step.from.id)}
                  alt={step.from.name[i18n.language] || step.from.name.en}
                  className={`h-10 sm:h-16 w-auto cursor-pointer object-contain transition-opacity ${caught.includes(step.from.id) ? 'opacity-40' : ''}`}
                  style={canClickFrom ? {} : { pointerEvents: 'none' }}
                  onClick={() => canClickFrom && toggleChainCaught(step.from.id, idx, false)}
                />
                {caught.includes(step.from.id) && (
                  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="12" fill="#22c55e"/>
                      <path d="M7 13.5L11 17L17 9.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                )}
                {shouldBlock && (
                  <span className="absolute top-1 left-1">
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="11" cy="11" r="10" fill="#ef4444"/>
                      <path d="M7 7L15 15M15 7L7 15" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
                    </svg>
                  </span>
                )}
                <span className="text-[13px] text-gray-800 sm:text-[15px] text-center mt-1">
                  {step.from.name[i18n.language] || step.from.name.en}
                </span>
                {renderCapture(step.from)}
              </div>
              {/* Flèche et infos seulement si ce n'est pas une évolution par Pierre Lune */}
              {step.evolution &&
                !(
                  step.evolution.stone &&
                  (step.evolution.stone.fr === "Pierre Lune" ||
                    step.evolution.stone.en === "Moon Stone")
                ) && (
                  <div className="flex flex-col items-center mx-2 pr-2 pf-2 sm:mx-1 sm:pr-1">
                    <span className="text-lg sm:text-base">→</span>
                    <span className="text-s text-green-600 font-bold mt-1 sm:text-xs sm:mt-0.5">
                      {step.evolution.level
                        ? (i18n.language === 'fr' ? ` Niv. ${step.evolution.level}` : ` Lv. ${step.evolution.level}`)
                        : step.evolution.stone
                        ? (step.evolution.stone[i18n.language] || step.evolution.stone.en)
                        : step.evolution.trade
                        ? (i18n.language === 'fr' ? 'Échange' : 'Trade')
                        : ""}
                    </span>
                  </div>
                )}
              {idx === chain.length - 1 && step.to && (
                <div className="flex flex-col items-center min-w-[80px] sm:min-w-[56px] relative">
                  <img
                    src={getSpritePath(step.to.id)}
                    alt={step.to.name[i18n.language] || step.to.name.en}
                    className={`h-10 sm:h-16 w-auto cursor-pointer object-contain transition-opacity ${caught.includes(step.to.id) ? 'opacity-40' : ''}`}
                    style={canClickTo ? {} : { pointerEvents: 'none' }}
                    onClick={() => canClickTo && toggleChainCaught(step.to.id, idx, true)}
                  />
                  {caught.includes(step.to.id) && (
                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="12" fill="#22c55e"/>
                        <path d="M7 13.5L11 17L17 9.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  )}
                  {shouldBlock && (
                    <span className="absolute top-1 left-1">
                      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="11" cy="11" r="10" fill="#ef4444"/>
                        <path d="M7 7L15 15M15 7L7 15" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
                      </svg>
                    </span>
                  )}
                  <span className="text-[13px] text-gray-800 sm:text-[15px] text-center mt-1">
                    {step.to.name[i18n.language] || step.to.name.en}
                  </span>
                  {renderCapture(step.to)}
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    );
  };

  // Liste des Pokémon exclusifs Rouge et Bleu
  const redExclusiveIds = [
    "023", "024", "043", "044", "045", "056", "057", "058", "059", "123", "125"
  ];
  const blueExclusiveIds = [
    "027", "028", "037", "038", "054", "055", "069", "070", "071", "124", "126"
  ];


  // Calcul du nombre de Pokémon attrapés (opacity-20) dans le Pokédex principal (hors exclusifs)
  const exclusiveIds = version === 'red' ? redExclusiveIds : blueExclusiveIds;
  const transparentCount = Array.from({ length: 151 }, (_, i) => {
    const num = (i + 1).toString().padStart(3, '0');
    return caught.includes(num) && !exclusiveIds.includes(num);
  }).filter(Boolean).length;

  return (
    <div className="flex flex-row-reverse">
      {/* Sidebar Pokédex sticky à droite, 45% */}
      <div className="hidden lg:block w-[45%] flex-shrink-0 p-6">
        <div className="sticky top-8">
          <div className="flex justify-center gap-2 mb-2">
            <button
              className={`p-0 m-0 bg-transparent focus:outline-none`}
              onClick={() => setVersion('red')}
              title="Version Rouge"
            >
              <img src={redImg} alt="Red" className={`w-32 h-32 rounded shadow ${version === 'red' ? '' : 'opacity-40'}`} />
            </button>
            <button
              className={`p-0 m-0 bg-transparent focus:outline-none`}
              onClick={() => setVersion('blue')}
              title="Version Bleu"
            >
              <img src={blueImg} alt="Blue" className={`w-32 h-32 rounded shadow ${version === 'blue' ? '' : 'opacity-40'}`} />
            </button>
            {/* Choix du style de sprite par images */}
            <div className="flex items-center gap-6 ml-4">
              {/* Gen1 */}
              <div className="flex flex-col items-center cursor-pointer" onClick={() => setSpriteStyle('gen1')}>
                <img
                  src={gameboyImg}
                  alt="Game Boy"
                  className={`w-16 h-16  transition-opacity ${spriteStyle === 'gen1' ? '' : 'opacity-30'}`}
                  style={{objectFit:'contain'}}
                />
                <span className="text-[11px] text-gray-700 mt-1">Noir et blanc</span>
              </div>
              {/* Gen1-color */}
              <div className="flex flex-col items-center cursor-pointer" onClick={() => setSpriteStyle('gen1-colored')}>
                <img
                  src={gameboyColorImg}
                  alt="Game Boy Color"
                  className={`w-16 h-16 transition-opacity ${spriteStyle === 'gen1-colored' ? '' : 'opacity-30'}`}
                  style={{objectFit:'contain'}}
                />
                <span className="text-[11px] text-gray-700 mt-1">Couleurs</span>
              </div>
              {/* Gen3 */}
              <div className="flex flex-col items-center cursor-pointer" onClick={() => setSpriteStyle('gen3')}>
                <img
                  src={chenImg}
                  alt="Chen"
                  className={`w-16 h-16  transition-opacity ${spriteStyle === 'gen3' ? '' : 'opacity-30'}`}
                  style={{objectFit:'contain'}}
                />
                <span className="text-[11px] text-gray-700 mt-1">Artworks</span>
              </div>
            </div>
          </div>
          <h2 className="text-lg font-bold mb-2 text-center">{t('pokedexTitle')}</h2>
          <div className="text-xs text-center text-gray-600 mb-2">
            {t('caught')}
            <span className="font-bold text-green-700 mx-1">{transparentCount}</span>
            / 151
          </div>
          {/* Pokédex principal avec croix et transparence pour les exclusifs */}
          <div className={`grid [grid-template-columns:repeat(9,minmax(0,1fr))] gap-1 border border-gray-200 rounded-lg p-2 bg-white`}>
            {Array.from({ length: 151 }, (_, i) => {
              const num = (i + 1).toString().padStart(3, '0');
              // Hide Mew (#151)
              if (num === '151') return null;
              // Hide exclusives for the opposite version
              if ((version === 'red' && blueExclusiveIds.includes(num)) || (version === 'blue' && redExclusiveIds.includes(num))) return null;
              // Hide unavailable starters
              const starterFamilies = [
                ["001", "002", "003"],
                ["004", "005", "006"],
                ["007", "008", "009"]
              ];
              const chosenStarter = caught.find((id) => ["001", "004", "007"].includes(id));
              let isUnavailableStarter = false;
              if (chosenStarter) {
                const chosenFamily = starterFamilies.find(fam => fam.includes(chosenStarter));
                if (starterFamilies.filter(fam => fam !== chosenFamily).flat().includes(num)) {
                  isUnavailableStarter = true;
                }
              }
              if (isUnavailableStarter) return null;
              const poke = getPokemon(num);
              return (
                <div key={num} className="flex flex-col items-center relative">
                  <img
                    src={getSpritePath(num)}
                    alt={poke.name[i18n.language] || poke.name.en}
                    title={poke.name[i18n.language] || poke.name.en}
                    className={`h-12 w-auto object-contain transition-opacity ${caught.includes(num) ? 'opacity-100' : 'opacity-20'}`}
                    loading="lazy"
                  />
                </div>
              );
            })}
          </div>
          {/* Tableau des exclusifs à la version choisie */}
          <div className="mt-6">
            <h3 className={`text-md font-bold mb-2 text-center ${version === 'red' ? 'text-blue-700' : 'text-red-700'}`}>{version === 'red' ? t('blueExclusive') : t('redExclusive')}</h3>
            <div className={`bg-white border ${version === 'red' ? 'border-blue-200' : 'border-red-200'} rounded-lg p-2`}>
              <div className="grid grid-cols-6 gap-2 mb-2">
                {(version === 'red' ? blueExclusiveIds : redExclusiveIds).map(num => {
                  const poke = getPokemon(num);
                  return (
                    <div key={num} className="flex flex-col items-center">
                      <img
                        src={getSpritePath(num)}
                        alt={t(`pokemon${num}`)}
                        className="h-10 w-auto object-contain opacity-80"
                        loading="lazy"
                      />
                    </div>
                  );
                })}
              </div>
              {/* Separator if unavailable starters exist */}
              {(() => {
                const starterFamilies = [
                  ["001", "002", "003"],
                  ["004", "005", "006"],
                  ["007", "008", "009"]
                ];
                const chosenStarter = caught.find((id) => ["001", "004", "007"].includes(id));
                let unavailableStarterIds = [];
                if (chosenStarter) {
                  const chosenFamily = starterFamilies.find(fam => fam.includes(chosenStarter));
                  unavailableStarterIds = starterFamilies.filter(fam => fam !== chosenFamily).flat();
                }
                if (unavailableStarterIds.length === 0) return null;
                return (
                  <>
                    <hr className="my-3 border-gray-300" />
                    <h4 className="text-sm font-bold text-center text-gray-700 mb-1">
                      {i18n.language === 'fr' ? '🔒 Indisponible : choix unique.' : '🔒 Unavailable: single-choice only.'}
                    </h4>
                    <div className="grid grid-cols-6 gap-2">
                      {unavailableStarterIds.map(num => (
                        <div key={num} className="flex flex-col items-center relative">
                          <img
                            src={getSpritePath(num)}
                            alt={t(`pokemon${num}`)}
                            className="h-10 w-auto object-contain"
                            loading="lazy"
                          />
                        </div>
                      ))}
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        </div>
      </div>
    {/* Contenu principal à gauche, 55% */}
    <main className="w-full lg:w-[55%] max-w-4xl mx-auto p-6 bg-white">
        <div className="bg-gradient-to-r from-red-500 to-blue-500 text-white rounded-lg p-6 mb-8">
          <h1 className="text-3xl font-bold mb-2">{t('part1Title')}</h1>
          <p className="text-lg opacity-90">{t('oakChallengeGuide')}</p>
        </div>

        <div className="bg-amber-100 border-l-4 border-amber-500 p-4 mb-6">
        <p className="text-amber-800 font-medium">{t('introText')}</p>
      </div>
      {/* Levelling Tips */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-gray-200 pb-2">
          {t('levellingTips')}
        </h2>

        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 space-y-3">
          <p className="text-purple-800 text-sm">
            <strong>⏰ {t('timeInvestmentTitle')}</strong> {t('timeInvestment')}
          </p>
          <p className="text-purple-800 text-sm">
            <strong>💪 {t('strategyTitle')}</strong> {t('strategy')}
          </p>
          <p className="text-purple-800 text-sm">
            <strong>🎯 {t('proTipTitle')}</strong> {t('proTip')}
          </p>
          <p className="text-purple-800 text-sm">
            <strong>🏟️ {t('extraExpTitle')}</strong> {t('extraExp')}
          </p>
        </div>
      </section>

      {/* Pallet Town */}
      <section className="mb-8">
        <div className="flex items-center mb-4">
          <h2 className="flex flex-row items-center text-2xl font-bold text-gray-900 border-b-2 border-gray-200 pb-2 mb-0">
            {t('palletTownTitle')}
            <span className="mx-2 text-gray-400 text-lg select-none">-</span>
            <div className="relative group ">
              <img src={mapIcon} alt="Map icon" width={25} height={25} className="cursor-pointer" />
              <div className="absolute left-1/2 -translate-x-1/2 mt-2 z-50 hidden group-hover:flex transition-all duration-200">
                <div className="flex flex-row items-center p-2" style={{minWidth:'340px', maxWidth:'520px'}}>
                  <img src={palletTownMap} alt="Pallet Town Map" className="rounded mr-2 h-auto" />
                  <img src={palletTown} alt="Pallet Town" className="rounded max-w-[220px] w-auto h-auto" />
                </div>
              </div>
            </div>
          </h2>
        </div>
        <div className="mb-4">
          <p className="text-gray-700 mb-4">{t('palletTownText')}</p>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <p className="text-red-800 text-sm">
              <strong>⚠️ {t('importantTitle')}</strong> {t('importantText')}
            </p>
          </div>
        </div>
        {/* List starters */}
        {["001", "004", "007"].map((id) => (
          <div key={id}>
            <EvolutionCard startId={id} />
          </div>
        ))}
      </section>

      {/* Route 1 */}
      <section className="mb-8">
        <div className="flex items-center mb-4">
          <h2 className="flex flex-row items-center text-2xl font-bold text-gray-900 border-b-2 border-gray-200 pb-2 mb-0">
            {t('route1Title')}
            <span className="mx-2 text-gray-400 text-lg select-none">-</span>
            <div className="relative group ">
              <img src={mapIcon} alt="Map icon" width={25} height={25} className="cursor-pointer" />
              <div className="absolute left-1/2 -translate-x-1/2 mt-2 z-50 hidden group-hover:flex transition-all duration-200">
                <div className="flex flex-row items-center p-2" style={{minWidth:'340px', maxWidth:'520px'}}>
                  <img src={route1Map} alt="Route 1 Map" className="rounded mr-2 h-auto" />
                  <img src={route1} alt="Route 1" className="rounded max-w-[220px] w-auto h-auto" />
                </div>
              </div>
            </div>
          </h2>
        </div>
        <p className="text-gray-700 mb-4">{t('route1Text')}</p>
        {["016", "019"].map((id) => (
          <div key={id}>
            <EvolutionCard startId={id} />
          </div>
        ))}
      </section>

      {/* Route 22 */}
      <section className="mb-8">
        <div className="flex items-center mb-4">
          <h2 className="flex flex-row items-center text-2xl font-bold text-gray-900 border-b-2 border-gray-200 pb-2 mb-0">
            {t('route22Title')}
            <span className="mx-2 text-gray-400 text-lg select-none">-</span>
            <div className="relative group ">
              <img src={mapIcon} alt="Map icon" width={25} height={25} className="cursor-pointer" />
              <div className="absolute left-1/2 -translate-x-1/2 mt-2 z-50 hidden group-hover:flex transition-all duration-200">
                <div className="flex flex-row items-center p-2" style={{minWidth:'340px', maxWidth:'520px'}}>
                  <img src={route22Map} alt="Route 22 Map" className="rounded mr-2 h-auto" />
                  <img src={route22} alt="Route 22" className="rounded max-w-[420px] w-auto h-[auto]" />
                </div>
              </div>
            </div>
          </h2>
        </div>
        <p className="text-gray-700 mb-4">{t('route22Text')}</p>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
          <p className="text-yellow-800 text-sm">
            <strong>💡 {t('tipTitle')}</strong> {t('tipText')}
          </p>
        </div>
        {["029", "032", "021"].map((id) => (
          <div key={id}>
            <EvolutionCard startId={id} />
          </div>
        ))}
      </section>

      {/* Viridian Forest */}
      <section className="mb-8">
        <div className="flex items-center mb-4">
          <h2 className="flex flex-row items-center text-2xl font-bold text-gray-900 border-b-2 border-gray-200 pb-2 mb-0">
            {t('viridianForestTitle')}
            <span className="mx-2 text-gray-400 text-lg select-none">-</span>
            <div className="relative group ">
              <img src={mapIcon} alt="Map icon" width={25} height={25} className="cursor-pointer" />
              <div className="absolute left-1/2 -translate-x-1/2 mt-2 z-50 hidden group-hover:flex transition-all duration-200">
                <div className="flex flex-row items-center p-2" style={{minWidth:'340px', maxWidth:'520px'}}>
                  <img src={viridianForestMap} alt="Viridian Forest Map" className="rounded mr-2 h-auto" />
                  <img src={viridianForest} alt="Viridian Forest" className="rounded max-w-[220px] w-auto h-auto" />
                </div>
              </div>
            </div>
          </h2>
        </div>
        <p className="text-gray-700 mb-4">{t('viridianForestText')}</p>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
          <p className="text-green-800 text-sm">
            <strong>🐛 {t('strategyBugTitle')}</strong> {t('strategyBugText')}
          </p>
        </div>
        <EvolutionCard startId="010" />
        <EvolutionCard startId="013" />
        <EvolutionCard startId="025" />
      </section>

      {/* Pokédex mobile en bas de page */}
      <div className="block lg:hidden mt-8 mb-8">
        <h2 className="text-lg font-bold mb-2 text-center">{t('pokedexTitle')}</h2>
        <div className="grid grid-cols-6 gap-1 bg-white border border-gray-200 rounded-lg p-2">
          {Array.from({ length: 151 }, (_, i) => {
            const num = (i + 1).toString().padStart(3, '0');
            const poke = getPokemon(num);
            return (
              <div key={num} className="flex flex-col items-center">
                <img
                  src={getSpritePath(num)}
                  alt={poke.name[i18n.language] || poke.name.en}
                  title={poke.name[i18n.language] || poke.name.en}
                  className={`h-8 w-auto object-contain transition-opacity ${caught.includes(num) ? 'opacity-20' : ''}`}
                  loading="lazy"
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Summary */}
      <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-lg p-6">
        <h2 className="text-xl font-bold mb-2">{t('endPart1')}</h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg font-bold">{t('caught')} {caught.length} / 21</p>
            <p className="text-sm opacity-90">{t('remaining')} {21 - caught.length}</p>
          </div>
          <div className="text-4xl">🎯</div>
        </div>
      </div>
      </main>
    </div>
  );
};

export default GuideRedBlue;
