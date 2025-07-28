import React from "react";
import pokemonList from "../../assets/data/pokemonList.json";

import mapIcon from '../../assets/icons/map.png';

import route1MapPng from '../../assets/images/gen_1_routes/route_1_map.png';
import route1Webp from '../../assets/images/gen_1_routes/route_1.webp';

const GuideRedBlue = () => {
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
            <div className="italic font-bold text-[12px] mt-1">
              <span className="text-red-600">{poke.capture_percentage.R}%</span>
              <span className="mx-1">/</span>
              <span className="text-blue-600">{poke.capture_percentage.B}%</span>
            </div>
          );
        } else {
          return (
            <div className="text-[13px] italic mt-1">
              <span className="font-mono font-bold italic">
                {poke.capture_percentage.R}%
              </span>
            </div>
          );
        }
      } else {
        return (
          <div className="text-[13px] italic mt-1">
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
        <div className="flex items-center bg-blue-50 border border-blue-200 rounded-lg p-3 mb-2 overflow-x-auto w-fit ml-0">
          <div className="flex flex-col items-center min-w-[80px]">
            <img
              src={`/src/assets/images/pokemons/025.png`}
              alt={pikachu.name.en}
              className="w-10 h-10 mb-1"
            />
            <span className="text-xs font-medium text-gray-800">
              {pikachu.name.en}
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
        <div className="flex items-center bg-blue-50 border border-blue-200 rounded-lg p-3 mb-2 overflow-x-auto w-fit ml-0">
          <div className="flex flex-col items-center min-w-[80px]">
            <img
              src={`/src/assets/images/pokemons/${poke.id}.png`}
              alt={poke.name.en}
              className="w-10 h-10 mb-1"
            />
            <span className="text-xs font-medium text-gray-800">
              {poke.name.en}
            </span>
            {renderCapture(poke)}
          </div>
        </div>
      );
    }
    return (
      <div className="flex items-center bg-blue-50 border border-blue-200 rounded-lg p-3 mb-2 overflow-x-auto w-fit ml-0">
        {chain.map((step, idx) => (
          <React.Fragment key={step.from.id}>
            <div className="flex flex-col items-center min-w-[80px]">
              <img
                src={`/src/assets/images/pokemons/${step.from.id}.png`}
                alt={step.from.name.en}
                className="w-10 h-10 mb-1"
              />
              <span className="text-xs font-medium text-gray-800">
                {step.from.name.en}
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
                  className="w-10 h-10 mb-1"
                />
                <span className="text-xs font-medium text-gray-800">
                  {step.to.name.en}
                </span>
                {renderCapture(step.to)}
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <div className="bg-gradient-to-r from-red-500 to-blue-500 text-white rounded-lg p-6 mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Part 1 - Pre Badge #1 from Brock
        </h1>
        <p className="text-lg opacity-90">Professor Oak Challenge Guide</p>
      </div>

      <div className="bg-amber-100 border-l-4 border-amber-500 p-4 mb-6">
        <p className="text-amber-800 font-medium">
          This first part will cover everything you can do BEFORE you get that
          first badge from Brock. This is probably the most daunting part of the
          challenge…
        </p>
      </div>
      {/* Levelling Tips */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-gray-200 pb-2">
          Levelling Tips
        </h2>

        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 space-y-3">
          <p className="text-purple-800 text-sm">
            <strong>⏰ Time Investment:</strong> This will be the longest part
            of your challenge and is made even more painful without any way to
            rematch trainers or run/cycle.
          </p>
          <p className="text-purple-800 text-sm">
            <strong>💪 Strategy:</strong> The real killers are getting that
            fully evolved starter and Pidgeot. Continuously battle using the
            same pokemon until it runs out of PP or is KO'd.
          </p>
          <p className="text-purple-800 text-sm">
            <strong>🎯 Pro Tip:</strong> DON'T evolve Pidgey until it learns
            Wing Attack at Lv28 otherwise Pidgeotto won't learn it until Lv31
            and will level very slowly due to limited PP.
          </p>
          <p className="text-purple-800 text-sm">
            <strong>🏟️ Extra Experience:</strong> Defeat the trainers in Brock's
            gym for extra experience, just don't talk to Brock until you've
            completed this section!
          </p>
        </div>
      </section>

      {/* Pallet Town */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-gray-200 pb-2">
          Pallet Town - Starter Choices
        </h2>
        <div className="mb-4">
          <p className="text-gray-700 mb-4">
            Starting off in your hometown, you'll soon be given the chance to
            grab your first starter pokemon. As tempting as Bulbasaur might be
            because it evolves into its final stage earlier than the others, I
            find Bulbasaur very difficult to train in Viridian Forest since you
            don't have any reliable attacks other than Tackle.
          </p>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <p className="text-red-800 text-sm">
              <strong>⚠️ Important:</strong> There is a glitch in these games
              where your starter won't register if you evolve it prior to
              getting the pokedex. Go to Viridian City, grab the parcel from the
              Pokemart, deliver it to Professor Oak and grab that important
              pokedex and some pokeballs first!
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
          <div className="flex flex-col w-full">
            <div className="relative flex items-center w-full mb-1">
              <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-gray-200 pb-2 mb-0 flex items-center">
                Route 1
                <span className="mx-2 text-gray-400 text-lg select-none">-</span>
                <div className="relative group ">
                  <img src={mapIcon} alt="Map icon" width={25} height={25} className="cursor-pointer" />
                  <div className="absolute left-1/2 -translate-x-1/2 mt-2 z-50 hidden group-hover:flex transition-all duration-200">
                    <div className="flex flex-row items-center p-2" style={{minWidth:'340px', maxWidth:'520px'}}>
                      <img src={route1MapPng} alt="Route 1 Map" className="rounded mr-2 h-auto" />
                      <img src={route1Webp} alt="Route 1" className="rounded max-w-[220px] w-auto h-auto" />
                    </div>
                  </div>
                </div>
              </h2>
            </div>
          </div>
        </div>
        <p className="text-gray-700 mb-4">
          Only two pokemon to catch and evolve here. You can of course opt to
          hold out a little longer to get them at slightly higher levels but
          it's negligible extra work that a couple of Metapod/Kakuna can't fix.
        </p>
        {["016", "019"].map((id) => (
          <div key={id}>
            <EvolutionCard startId={id} />
          </div>
        ))}
      </section>

      {/* Route 22 */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-gray-200 pb-2">
          Route 22
        </h2>
        <p className="text-gray-700 mb-4">
          Pass through Viridian City and go West to Route 22 where you can catch
          the following Pokémon. The rarity of the Nidoran varies between
          versions with the male being more common in Red version but the female
          more commonly found in Blue version.
        </p>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
          <p className="text-yellow-800 text-sm">
            <strong>💡 Tip:</strong> Catch another Spearow for a trade later on.
            You can battle your rival here for extra experience. Nidorina and
            Nidorino can't evolve any further just yet.
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
        <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-gray-200 pb-2">
          Viridian Forest
        </h2>
        <p className="text-gray-700 mb-4">
          Back into Viridian City, head north this time and skip over Route 2 to
          Viridian Forest. Depending on your version, one of these bugs will be
          rarer than the others. Red will find Weedle more frequently while Blue
          has Caterpie as the common bug.
        </p>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
          <p className="text-green-800 text-sm">
            <strong>🐛 Strategy:</strong> You can catch Metapod and Kakuna but
            as they won't have any attacking moves, the better strategy is to
            level Caterpie/Weedle up to level 9, evolve them and then train the
            cocoons one more level.
          </p>
        </div>
        <EvolutionCard startId="010" />
        <EvolutionCard startId="013" />
        <EvolutionCard startId="025" />
      </section>

      {/* Summary */}
      <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-lg p-6">
        <h2 className="text-xl font-bold mb-2">End of Part 1</h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg font-bold">Caught: 21</p>
            <p className="text-sm opacity-90">Remaining: 130</p>
          </div>
          <div className="text-4xl">🎯</div>
        </div>
      </div>
    </div>
  );
};

export default GuideRedBlue;
