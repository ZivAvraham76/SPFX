import * as React from 'react';
import type { ICarrouselProps } from './ICarrouselProps';
import '../../../../assets/dist/tailwind.css';

export interface ICarrouselState {
  selectedPillar: string; // Pillar selected by the user
  selectedLevel: string; // Level selected by the user
  isDropdownOpen: boolean; // Whether the dropdown menu is open
}

export default class Carrousel extends React.Component<ICarrouselProps, ICarrouselState> {
  constructor(props: ICarrouselProps) {
    super(props);

    // Initial state setup
    this.state = {
      selectedPillar: 'All', // Default pillar
      selectedLevel: 'All Levels', // Default level
      isDropdownOpen: false, // Dropdown menu is closed by default
    };
  }


  filterData() {
    const { data } = this.props; // Data passed as a prop
    const { selectedPillar, selectedLevel } = this.state; // Current filters

    // Return filtered data
    return data.filter((item) => {
      const matchesPillar = selectedPillar === 'All' || item.pillar === selectedPillar;
      const matchesLevel = selectedLevel === 'All Levels' || item.levelName === selectedLevel;
      return matchesPillar && matchesLevel;
    });
  }

  public render(): React.ReactElement<ICarrouselProps> {
    const filteredData = this.filterData(); // Get filtered data based on current state

    return (
      <section>
        {/* Top Section - Pillars and Dropdown */}
        <div className="flex items-center justify-start space-x-2 p-2 max-w-[400px]">
          {/* Pillars */}
          <div className="flex border border-gray-300 rounded-full overflow-hidden divide-x divide-gray-300 flex-shrink-0">
            {['Quantum', 'Harmony', 'CloudGuard', 'Infinity'].map((pillar) => (
              <button
                key={pillar}
                onClick={() => this.setState({ selectedPillar: pillar })}
                className={`px-2 py-1 text-sm font-medium transition ${
                  this.state.selectedPillar === pillar
                    ? 'bg-gray-200 text-gray-800'
                    : 'bg-white text-gray-800 hover:bg-gray-100'
                }`}
              >
                {pillar}
              </button>
            ))}
          </div>

          {/* Dropdown Levels */}
          <div className="relative inline-block text-left h-full">
            <button
              onClick={() => this.setState({ isDropdownOpen: !this.state.isDropdownOpen })}
              className="px-2 py-1 pr-8 rounded-full bg-gray-200 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 flex items-center justify-between whitespace-nowrap w-[120px]"
            >
              {this.state.selectedLevel}
              <svg
                className="w-3 h-3 ml-1 text-gray-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M7 10l5 5 5-5H7z" />
              </svg>
            </button>

            {this.state.isDropdownOpen && (
              <div className="absolute mt-2 w-36 rounded-md bg-white shadow-lg ring-1 ring-black/5 z-50">
                <ul className="py-1">
                  {['All Levels', 'Fundamentals', 'Advanced', 'Expert'].map((level) => (
                    <li
                      key={level}
                      onClick={() =>
                        this.setState({ selectedLevel: level, isDropdownOpen: false })
                      }
                      className="cursor-pointer px-3 py-1 text-sm text-gray-800 hover:bg-gray-300 hover:text-gray-900"
                    >
                      {level}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Carousel Section */}
        <div className="relative">
          <div
            id="carousel"
            className="flex space-x-2 overflow-x-scroll scrollbar-hide scroll-smooth"
            style={{ scrollSnapType: 'x mandatory', width: '100%' }}
          >
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
                  {/* Card - Image and Level */}
                  <div className="relative h-2/5 bg-gray-200">
                    <img
                      src={require('../../carrousel/assets/background-photo.jpg')}
                      className="h-full w-full object-cover"
                      alt="Course"
                    />
                    <div className="absolute top-2 left-2 bg-white text-xs text-gray-800 font-semibold px-2 py-1 rounded">
                      {item.levelName || 'Level'}
                    </div>
                  </div>

                  {/* Card - Details */}
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
                    <div className="flex-grow min-h-[40px]">
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

          {/* Swipe Buttons */}
          <button
            className="absolute right-[-14px] top-[60px] transform -translate-y-1/2 bg-gray-700 p-2 rounded-full shadow-md"
            onClick={() => {
              const carousel = document.getElementById('carousel');
              if (carousel !== null) {
                carousel.scrollLeft += 150;
              }
            }}
          >
            <svg
              className="h-4 w-4 text-white"
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
          <button
            className="absolute left-[-14px] top-[60px] transform -translate-y-1/2 bg-gray-700 p-2 rounded-full shadow-md"
            onClick={() => {
              const carousel = document.getElementById('carousel');
              if (carousel !== null) {
                carousel.scrollLeft -= 150;
              }
            }}
          >
            <svg
              className="h-4 w-4 text-white"
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
