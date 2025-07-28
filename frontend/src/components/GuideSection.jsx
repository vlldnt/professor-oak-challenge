
import React from "react";
import { useTranslation } from "react-i18next";
import mapIcon from '../assets/icons/map.png';
import pokemonList from '../assets/data/pokemonList.json';

// EvolutionCard intégré ici pour usage local
function EvolutionCard({ startId }) {
  const getPokemon = (id) => pokemonList.find((p) => p.id === id);

  // Construction de la chaîne d'évolution (hors Pierre Lune)
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

  // Affichage du taux de capture stylé
  const renderCapture = (poke) => {
    if (!poke.capture_percentage) return null;
    if (
      typeof poke.capture_percentage === "object" &&
      poke.capture_percentage.R !== undefined &&
      poke.capture_percentage.B !== undefined
    ) {
      if (poke.capture_percentage.R !== poke.capture_percentage.B) {
        return (
          <div className="italic font-bold text-[14px] mt-1">
            <span className="text-red-600">R {poke.capture_percentage.R}%</span>
            <span className="mx-1">/</span>
            <span className="text-blue-600">B {poke.capture_percentage.B}%</span>
          </div>
        );
      } else {
        return (
          <div className="italic font-bold text-[14px] mt-1">
            <span>{poke.capture_percentage.R}%</span>
          </div>
        );
      }
    } else {
      return (
        <div className="italic font-bold text-[14px] mt-1">
          <span>{poke.capture_percentage}%</span>
        </div>
      );
    }
  };

  // Cas spécial Pikachu : affiche juste Pikachu
  if (startId === "025" || startId === 25) {
    const pikachu = getPokemon("025");
    return (
      <div className="flex items-center bg-gradient-to-r from-yellow-100 to-yellow-300 border border-yellow-300 rounded-lg p-3 mb-2 overflow-x-auto">
        <div className="flex flex-col items-center min-w-[80px]">
          <img
            src={`/src/assets/images/pokemons/025.png`}
            alt={pikachu.name.en}
            className="w-12 h-12 mb-1"
          />
          <span className="text-sm font-medium text-gray-800">{pikachu.name.en}</span>
          {renderCapture(pikachu)}
        </div>
      </div>
    );
  }

  // Chaîne d'évolution normale, sans Pierre Lune
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
      <div className="flex items-center bg-gradient-to-r from-blue-100 to-blue-200 border border-blue-200 rounded-lg p-3 mb-2 overflow-x-auto">
        <div className="flex flex-col items-center min-w-[80px]">
          <img
            src={`/src/assets/images/pokemons/${poke.id}.png`}
            alt={poke.name.en}
            className="w-12 h-12 mb-1"
          />
          <span className="text-sm font-medium text-gray-800">{poke.name.en}</span>
          {renderCapture(poke)}
        </div>
      </div>
    );
  }
  return (
    <div className="flex items-center bg-gradient-to-r from-blue-100 to-blue-200 border border-blue-200 rounded-lg p-3 mb-2 overflow-x-auto">
      {chain.map((step, idx) => (
        <React.Fragment key={step.from.id}>
          <div className="flex flex-col items-center min-w-[80px]">
            <img
              src={`/src/assets/images/pokemons/${step.from.id}.png`}
              alt={step.from.name.en}
              className="w-12 h-12 mb-1"
            />
            <span className="text-sm font-medium text-gray-800">{step.from.name.en}</span>
            {renderCapture(step.from)}
          </div>
          {/* Flèche et infos seulement si ce n'est pas une évolution par Pierre Lune */}
          {step.evolution &&
            !(
              step.evolution.stone &&
              (step.evolution.stone.fr === "Pierre Lune" ||
                step.evolution.stone.en === "Moon Stone")
            ) && (
              <div className="flex flex-col items-center mx-2 pr-2 pf-2">
                <span className="text-blue-500 text-lg">→</span>
                <span className="text-xs text-green-600 font-medium mt-1">
                  {step.evolution.level
                    ? `Lv.${step.evolution.level}`
                    : step.evolution.stone
                    ? step.evolution.stone.en
                    : step.evolution.trade
                    ? "Trade"
                    : ""}
                </span>
              </div>
            )}
          {idx === chain.length - 1 && step.to && (
            <div className="flex flex-col items-center min-w-[80px]">
              <img
                src={`/src/assets/images/pokemons/${step.to.id}.png`}
                alt={step.to.name.en}
                className="w-12 h-12 mb-1"
              />
              <span className="text-sm font-medium text-gray-800">{step.to.name.en}</span>
              {renderCapture(step.to)}
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

const GuideSection = ({ section }) => {
  const { i18n } = useTranslation();
  const lang = i18n.language || "en";

  return (
    <section className="mb-8">
      <div className="flex items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-gray-200 pb-2 flex items-center">
          {section.title[lang]}
          {section.mapImages && (
            <>
              <span className="mx-2 text-gray-400 text-lg select-none">-</span>
              <div className="relative group">
                <img src={mapIcon} alt="Map icon" width={25} height={25} className="cursor-pointer" />
                <div className="absolute left-1/2 -translate-x-1/2 mt-2 z-50 hidden group-hover:flex transition-all duration-200">
                  <div className="flex flex-row items-start p-2 bg-red-600 border border-gray-300 rounded-lg shadow-lg w-fit">
                    {section.mapImages.map((img, idx) => (
                      <img key={idx} src={img} alt={`Map ${idx}`} className="rounded mr-2 h-auto" />
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </h2>
      </div>
      <p className="text-gray-700 mb-4">{section.text[lang]}</p>
      {section.tip && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
          <p className="text-red-800 text-sm">{section.tip[lang]}</p>
        </div>
      )}
    </section>
  );
};

export default GuideSection;
