import * as React from 'react';
import type { ICarrouselProps } from './ICarrouselProps';
import '../../../../assets/dist/tailwind.css';

export interface ICarrouselState {
  selectedPillar: string;
  selectedLevel: string;
  isDropdownOpen: boolean;
}

export default class Carrousel extends React.Component<ICarrouselProps, ICarrouselState> {
  constructor(props: ICarrouselProps) {
    super(props);
    console.log('props:', this.props);
    this.state = {
      selectedPillar: 'All',
      selectedLevel: 'All Levels',
      isDropdownOpen: false,
    };
  }

  filterData() {
    const { data } = this.props;
    const { selectedPillar, selectedLevel } = this.state;

    return data.filter((item) => {
      const matchesPillar = selectedPillar === 'All' || item.pillar === selectedPillar;
      const matchesLevel = selectedLevel === 'All Levels' || item.levelName === selectedLevel;
      return matchesPillar && matchesLevel;
    });
  }

  public render(): React.ReactElement<ICarrouselProps> {
    const filteredData = this.filterData();

    return (
      <section>
        {/* Top Section */}
        <div className="flex items-center space-x-4 p-4 min-w-fit max-w-full flex-wrap ml-2">
          {/* Pillars */}
          <div className="flex border border-gray-300 rounded-full overflow-hidden divide-x divide-gray-300 flex-shrink-0">
            {['Quantum', 'Harmony', 'CloudGuard', 'Infinity'].map((pillar) => (
              <button
                key={pillar}
                onClick={() => this.setState({ selectedPillar: pillar })}
                className={`px-4 py-2 font-medium transition ${
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
              className="px-4 py-2 pr-8 h-full rounded-full bg-gray-200 text-gray-800 text-lg focus:outline-none focus:ring-2 focus:ring-gray-400 flex items-center justify-between"
            >
              {this.state.selectedLevel}
              <svg
      className="w-4 h-4 ml-2 text-gray-600"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M7 10l5 5 5-5H7z" />
    </svg>
            </button>

            {this.state.isDropdownOpen && (
              <div className="absolute mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black/5 z-50">
                <ul className="py-1">
                  {['All Levels', 'Fundamentals', 'Advanced', 'Expert'].map((level) => (
                    <li
                      key={level}
                      onClick={() =>
                        this.setState({ selectedLevel: level, isDropdownOpen: false })
                      }
                      className="cursor-pointer px-4 py-2 text-lg text-gray-800 hover:bg-gray-300 hover:text-gray-900"
                    >
                      {level}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div
            id="carousel"
            className="flex space-x-2 overflow-x-scroll scrollbar-hide"
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
                  {/* Top part of the card - image and level */}
                  <div className="relative h-2/5 bg-gray-200">
                    {/* Image */}
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

                  {/* Bottom part of the card - details */}
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

          {/* Swipe Right */}
          <button
            className="absolute right-[-14px] top-[60px] transform -translate-y-1/2 bg-gray-700 p-2 rounded-full shadow-md"
            onClick={() => {
              const carousel = document.getElementById('carousel');
              if (carousel !== null) {
                carousel.scrollLeft += 300;
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

          {/* Swipe Left */}
          <button
            className="absolute left-[-14px] top-[60px] transform -translate-y-1/2 bg-gray-700 p-2 rounded-full shadow-md"
            onClick={() => {
              const carousel = document.getElementById('carousel');
              if (carousel !== null) {
                carousel.scrollLeft -= 300;
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
