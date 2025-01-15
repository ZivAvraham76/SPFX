import * as React from 'react';
// import styles from './Carrousel.module.scss';
import type { ICarrouselProps } from './ICarrouselProps';
import '../../../../assets/dist/tailwind.css';

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
          {/* Pillars */}
          <div className="flex border border-gray-300 rounded-full overflow-hidden divide-x divide-gray-300">
            {['Quantum', 'Harmony', 'CloudGuard', 'Infinity'].map((pillar) => (
              <button
                key={pillar}
                onClick={() => this.setState({ selectedPillar: pillar })}
                className={`px-4 py-2 font-medium transition ${
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
            className="px-4 py-2 pr-8 rounded-full bg-gray-200 text-gray-800 focus:outline-none curs"
          >
            <option value="All">All Levels</option>
            <option value="Fundamentals">Fundamentals</option>
            <option value="Advanced">Advanced</option>
            <option value="Expert">Expert</option>
          </select>
        </div>

        <div className="relative">
          <div
            id="carousel"
            className="flex space-x-2 overflow-x-scroll scrollbar-hide"
            style={{ scrollSnapType: 'x mandatory', width: '100%' }}
          >
            {/* Card */}
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <div
                  key={index}
                  className="flex-none w-1/4 bg-white overflow-visible p-1"
                  style={{
                    scrollSnapAlign: 'start',
                    minHeight: '300px',
                  }}
                >
                  {/* Image */}
                  <div className="relative h-2/5 bg-gray-200">
                    <img
                      src={require('../../carrousel/assets/background-photo.jpg')}
                      className="h-full w-full object-cover"
                      alt="Course"
                    />
                    {/* Level */}
                    <div className="absolute top-2 left-2 bg-white text-xs text-gray-800 font-semibold px-2 py-1 rounded">
                      {item.levelName || 'Level'}
                    </div>
                  </div>

                  {/* Details */}
                  <div className="p-2 h-3/5 flex flex-col justify-between">
                    <div className="flex-grow min-h-[90px]">
                      {item.litmosLearningPathName && (
                        <h3 className="text-xs font-bold text-gray-800">
                          <a
                            href={item.litmosLearningPathUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="cursor-pointer"
                          >
                            {item.litmosLearningPathName}
                          </a>
                        </h3>
                      )}
                      {item.pillar && (
                        <p className="text-xs text-gray-600">{item.pillar}</p>
                      )}
                    </div>

                    <div className="flex-grow min-h-[60px]">
                      <div className="mt-auto">
                        {item.productName && (
                          <p className="text-xs font-semibold text-gray-800">
                            {item.productName}
                          </p>
                        )}
                        {item.PercentageComplete !== undefined && (
                          <p className="inline-flex items-center justify-center bg-gray-200 text-xs font-semibold text-gray-800 px-2 py-1 rounded-full px-1">
                            {item.PercentageComplete}%
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No courses match your filters.</p>
            )}
          </div>

          {/* Swipe Right */}
          <button
            className="absolute right-2 top-[60px] transform -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-md"
            onClick={() => {
              const carousel = document.getElementById('carousel');
              if (carousel !== null) {
                carousel.scrollLeft += 300;
              }
            }}
          >
            <svg
              className="h-4 w-4 text-gray-800"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 9l4-4-4-4"
              />
            </svg>
          </button>

          {/* Swipe Left */}
          <button
            className="absolute left-2 top-[60px] transform -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-md"
            onClick={() => {
              const carousel = document.getElementById('carousel');
              if (carousel !== null) {
                carousel.scrollLeft -= 300;
              }
            }}
          >
            <svg
              className="h-4 w-4 text-gray-800"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 1l-4 4 4 4"
              />
            </svg>
          </button>
        </div>
      </section>
    );
  }
}
