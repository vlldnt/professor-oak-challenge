
import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import '../../i18n';
import pokemonList from "../../assets/data/pokemonList.json";
import mapIcon from '../../assets/icons/map.png';
import route1Map from '../../assets/images/gen_1_routes/route_1_map.png';
import route1 from '../../assets/images/gen_1_routes/route_1.png';
import route22Map from '../../assets/images/gen_1_routes/route_22_map.png';
import route22 from '../../assets/images/gen_1_routes/route_22.png';
import viridianForestMap from '../../assets/images/gen_1_routes/viridian_forest_map.png';
import viridianForest from '../../assets/images/gen_1_routes/viridian_forest.png';
import palletTownMap from '../../assets/images/gen_1_routes/pallet_town_map.png';
import palletTown from '../../assets/images/gen_1_routes/pallet_town.png';

const GuideRedBlue = () => {
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
        <div className="flex items-center bg-blue-50 border border-blue-200 rounded-lg p-3 mb-2 overflow-x-auto w-fit ml-0 sm:p-2 sm:mb-1 max-w-full sm:max-w-[98vw]">
          <div className="flex flex-col items-center min-w-[80px] sm:min-w-[56px]">
            <img
              src={`/src/assets/images/pokemons/025.png`}
              alt={pikachu.name[i18n.language] || pikachu.name.en}
              className={`w-10 h-10 sm:w-16 sm:h-16 cursor-pointer transition-opacity ${caught.includes('025') ? 'opacity-40' : ''}`}
              onClick={() => toggleCaught('025')}
            />
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
        <div className="flex items-center bg-blue-50 border border-blue-200 rounded-lg p-3 mb-2 overflow-x-auto w-fit ml-0 sm:p-2 sm:mb-1 max-w-full sm:max-w-[98vw]">
          <div className="flex flex-col items-center min-w-[80px] sm:min-w-[56px]">
            <img
              src={`/src/assets/images/pokemons/${poke.id}.png`}
              alt={poke.name[i18n.language] || poke.name.en}
              className={`w-10 h-10 sm:w-16 sm:h-16 cursor-pointer transition-opacity ${caught.includes(poke.id) ? 'opacity-40' : ''}`}
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
    const isLineComplete = caught.includes(lastId);

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

    return (
      <div className={`flex items-center bg-blue-50 border border-blue-200 rounded-lg p-3 mb-2 overflow-x-auto w-fit ml-0 sm:p-2 sm:mb-1 max-w-full sm:max-w-[98vw] relative ${shouldFade ? 'opacity-30 pointer-events-none' : ''}`}> 
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
                  src={`/src/assets/images/pokemons/${step.from.id}.png`}
                  alt={step.from.name[i18n.language] || step.from.name.en}
                  className={`w-10 h-10 sm:w-16 sm:h-16 cursor-pointer transition-opacity ${caught.includes(step.from.id) ? 'opacity-40' : ''}`}
                  style={canClickFrom ? {} : { pointerEvents: 'none' }}
                  onClick={() => canClickFrom && toggleCaught(step.from.id)}
                />
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
                        ? `Lv.${step.evolution.level}`
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
                    src={`/src/assets/images/pokemons/${step.to.id}.png`}
                    alt={step.to.name[i18n.language] || step.to.name.en}
                    className={`w-10 h-10 sm:w-16 sm:h-16 cursor-pointer transition-opacity ${caught.includes(step.to.id) ? 'opacity-40' : ''}`}
                    style={canClickTo ? {} : { pointerEvents: 'none' }}
                    onClick={() => canClickTo && toggleCaught(step.to.id)}
                  />
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
        {isLineComplete && (
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="12" fill="#22c55e"/>
              <path d="M7 13.5L11 17L17 9.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        )}
      </div>
    );
  };

return (
  <div className="flex flex-row-reverse">
    {/* Sidebar Pokédex sticky à droite, 30% */}
    <aside className="hidden lg:block w-[30%] flex-shrink-0 p-6">
      <div className="sticky top-8">
        <h2 className="text-lg font-bold mb-2 text-center">{t('pokedexTitle')}</h2>
        <div className="grid grid-cols-9 gap-1 bg-gray-50 border border-gray-200 rounded-lg p-2">
          {Array.from({ length: 151 }, (_, i) => {
            const num = (i + 1).toString().padStart(3, '0');
            const poke = getPokemon(num);
            return (
              <div key={num} className="flex flex-col items-center">
                <img
                  src={`/src/assets/images/pokemons/${num}.png`}
                  alt={`Pokemon ${num}`}
                  className={`w-8 h-8 object-contain transition-opacity ${caught.includes(num) ? 'opacity-20' : ''}`}
                  loading="lazy"
                />
              </div>
            );
          })}
        </div>
      </div>
    </aside>
    {/* Contenu principal à gauche, 70% */}
    <main className="w-full lg:w-[70%] max-w-4xl mx-auto p-6 bg-white">
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
        <div className="grid grid-cols-6 gap-1 bg-gray-50 border border-gray-200 rounded-lg p-2">
          {Array.from({ length: 151 }, (_, i) => {
            const num = (i + 1).toString().padStart(3, '0');
            const poke = getPokemon(num);
            return (
              <div key={num} className="flex flex-col items-center">
                <img
                  src={`/src/assets/images/pokemons/${num}.png`}
                  alt={`Pokemon ${num}`}
                  className={`w-8 h-8 object-contain transition-opacity ${caught.includes(num) ? 'opacity-20' : ''}`}
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
