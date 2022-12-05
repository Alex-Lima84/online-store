/* eslint-disable eqeqeq */
import "./styles.scss";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import data from "../../api-data/db.json";
import { Idata, IsortList, IcolorList } from "../../interfaces";

const sortList: IsortList[] = [
  {
    id: 1,
    name: "Ordernar por:",
  },
  {
    id: 2,
    name: "Mais recentes",
  },
  {
    id: 3,
    name: "Menor preço",
  },
  {
    id: 4,
    name: "Maior preço",
  },
];

export default function Home() {
  const [sortOption, setsortOption] = useState<number>(0);
  const [clothesInfo, setClothesInfo] = useState<any>([]);
  const [filteredColor, setFilteredColor] = useState<string>();

  useEffect(() => {
    setClothesInfo(data.products);

    const handleSortOption = (sortOption: number) => {
      if (sortOption == 2) {
        console.log("mais recentes");
      }
      if (sortOption == 3) {
        const lowestPrice = [clothesInfo].sort((a: any, b: any) => a - b);
        setClothesInfo(lowestPrice);
      }
      if (sortOption == 4) {
        const highestPrice = [clothesInfo].sort((a: any, b: any) => b - a);
        setClothesInfo(highestPrice);
      }
    };
    handleSortOption(sortOption);
  }, [sortOption, clothesInfo]);

  const handleColor = (color: string) => {
    setFilteredColor(color);
    const filteredClothes = clothesInfo.filter((clothing: any) => {
      return clothing.color === filteredColor;
    });
    setClothesInfo(filteredClothes);
  };

  const colorsSet = new Set(clothesInfo.map((item: any) => item.color));
  const colorsArray = [...colorsSet];

  return (
    <>
      <Header />
      <div className="main-info">
        <p>Blusas</p>
        <div className="sort-options">
          <select
            className=""
            value={sortOption}
            onChange={(e: any) => setsortOption(e.target.value)}
          >
            {sortList.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="main-container">
        <aside>
          <div className="colors-container">
            <h3>CORES</h3>
            {colorsArray.map((item: any, id) => (
              <div key={id}>
                <input
                  type="radio"
                  name="color-info"
                  onChange={() => handleColor(item)}
                ></input>
                <label>{item}</label>
              </div>
            ))}
          </div>
        </aside>
        <div className="clothes-container">
          {clothesInfo
            ? clothesInfo.map((item: Idata) => (
                <div key={item.id} className="individual-clothing">
                  <img src={item.image} alt={`clothes ${item.id}`} />
                  <h3>{item.name}</h3>
                  <span>R$ {item.price.toFixed(2)}</span>
                  <span>
                    até {item.parcelamento[0]}x de R${" "}
                    {item.parcelamento[1].toFixed(2)}{" "}
                  </span>
                  <span>{item.date}</span>
                  <button
                    onClick={(event) => {
                      event.preventDefault();
                    }}
                  >
                    Comprar
                  </button>
                </div>
              ))
            : ""}
        </div>
      </div>
    </>
  );
}
