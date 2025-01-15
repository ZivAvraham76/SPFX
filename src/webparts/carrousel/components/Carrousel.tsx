import * as React from 'react';
// import styles from './Carrousel.module.scss';
import type { ICarrouselProps } from './ICarrouselProps';
import '../../../../assets/dist/tailwind.css'

export interface ICarrouselState {
  selectedPillar: string;
  selectedLevel: string;
}

export default class Carrousel extends React.Component<ICarrouselProps, ICarrouselState> {
  constructor(props: ICarrouselProps) {
    super(props);

    this.state = {
      selectedPillar: 'All',
      selectedLevel: 'All',
    };
  }

  filterData() {
    const { data } = this.props;
    const { selectedPillar, selectedLevel } = this.state;

    return data.filter((item) => {
      const matchesPillar = selectedPillar === 'All' || item.pillar === selectedPillar;
      const matchesLevel = selectedLevel === 'All' || item.levelName === selectedLevel;
      return matchesPillar && matchesLevel;
    });
  }

  public render(): React.ReactElement<ICarrouselProps> {
    const filteredData = this.filterData(); 

    return (
      <section className="p-6 w-screen h-screen p-4">
      <div className="flex justify-between items-center mb-6">
{/* כפתורי Pillars */}
<div className="flex space-x-2 bg-pink-200 p-2 rounded-full">
  {['Quantum', 'Harmony', 'CloudGuard', 'Infinity'].map((pillar) => (
    <button
      key={pillar}
      onClick={() => this.setState({ selectedPillar: pillar })}
      className={`px-4 py-2 rounded-full font-medium ${
        this.state.selectedPillar === pillar
          ? 'bg-blue-600 text-white'
          : 'bg-white text-gray-800 border border-gray-300 hover:bg-gray-100'
      }`}
    >
      {pillar}
    </button>
  ))}
</div>

{/* Dropdown Levels */}
<select
  value={this.state.selectedLevel}
  onChange={(e) => this.setState({ selectedLevel: e.target.value })}
  className="px-4 py-2 rounded-full bg-white border border-gray-300 text-gray-800 hover:bg-gray-100 focus:ring focus:ring-blue-300"
>
  <option value="All">All Levels</option>
  <option value="Fundamentals">Fundamentals</option>
  <option value="Advanced">Advanced</option>
  <option value="Expert">Expert</option>
</select>
</div>

<div>
        {filteredData.length > 0 ? (
          filteredData.map((item, index) => (
            <div key={index} className="border border-gray-300">
              <h3>{item.litmosLearningPathName || "No Title Available"}</h3>
              <p>{item.levelName}</p>
              <p>{item.productName}</p>
              <p>{item.pillar}</p>
              <p>{item.PercentageComplete || 0}%</p>
            </div>
          ))
        ) : (
          <p>No courses match your filters.</p>
        )}
      </div>

    </section>
  );
}
}
