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
      <section>
      <div className="flex items-center space-x-4 p-4">
{/* כפתורי Pillars */}
<div className="flex border border-gray-300 rounded-full overflow-hidden divide-x divide-gray-300">
  {['Quantum', 'Harmony', 'CloudGuard', 'Infinity'].map((pillar) => (
    <button
      key={pillar}
      onClick={() => this.setState({ selectedPillar: pillar })}
      className={`px-4 py-2 rounded-full font-medium transition ${
        this.state.selectedPillar === pillar
          ? 'bg-gray-500 text-white'
          : 'bg-white text-gray-800 hover:bg-gray-100'
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
  className= "px-4 py-2 rounded-full bg-gray border border-gray-300 text-gray-800 hover:bg-gray-100 focus:ring focus:ring-gray-300"
>
  <option value="All">All Levels</option>
  <option value="Fundamentals">Fundamentals</option>
  <option value="Advanced">Advanced</option>
  <option value="Expert">Expert</option>
</select>
</div>

<div className="relative overflow-x-hidden">
  {/* כפתור גלילה שמאלה */}
  <button
    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-md"
    onClick={() => {
      const carousel = document.getElementById('carousel');
      if (carousel !== null) {
        carousel.scrollLeft += 300;
      }
    }}   >
    <svg
                className="h-4 w-4 text-white dark:text-gray-800"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
            >
                <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 1 1 5l4 4"
                />
                </svg>
  </button>

  {/* קרוסלה */}
  <div
    id="carousel"
    className="flex space-x-4 overflow-x-scroll scrollbar-hide"
    style={{ scrollSnapType: 'x mandatory', width: '100%' }}
  >
    {/*card*/}
    {filteredData.length > 0 ? (
      filteredData.map((item, index) => (
        <div
          key={index}
          className="flex-none w-1/4 border border-gray-300 rounded-lg shadow-md p-4"
          style={{ scrollSnapAlign: 'start' }}
        >
          {/*image*/}
          <div className="relative h-40 bg-gray-200">
            <img
              src={item.imageUrl || 'https://via.placeholder.com/150'}
              className="h-full w-full object-cover"
            />
          {/*Level*/}
          <div className="absolute top-2 left-2 bg-white text-sm text-gray-800 font-semibold px-2 py-1 rounded">
              {item.levelName || 'Level'}
          </div>
          </div>

          {/*deatails*/}
          <div className='p-4'>
            <h3 className="text-lg font-bold text-gray-800 mt-1">
              {item.litmosLearningPathName || 'No Title Available'}
            </h3>
            <p className="text-sm text-gray-600">{item.pillar}</p>
            <p className="text-lg font-bold text-gray-800 mt-1">{item.productName}</p>
            <p className="text-sm font-semibold text-gray-800 mt-2">
              {item.PercentageComplete || 0}%
            </p>
          </div>
        </div>
      ))
    ) : (
      <p>No courses match your filters.</p>
    )}
  </div>

  {/* כפתור גלילה ימינה */}
  <button
    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-md"
    onClick={() => {
      const carousel = document.getElementById('carousel');
      if (carousel !== null) {
        carousel.scrollLeft += 300;
      }
    }} >
    <svg
                className="h-4 w-4 text-white dark:text-gray-800"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
            >
                <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 9 4-4-4-4"
                />
            </svg>
  </button>
</div>


    </section>
  );
}
}
