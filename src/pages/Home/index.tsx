import "./styles.scss";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import data from "../../api-data/db.json";
import { Idata, IsortList } from "../../interfaces";

const sortList: IsortList[] = [
  {
    id: "1",
    name: "Ordernar por:",
  },
  {
    id: "2",
    name: "Mais recentes",
  },
  {
    id: "3",
    name: "Menor preço",
  },
  {
    id: "4",
    name: "Maior preço",
  },
];

export default function Home() {
  const [sortOption, setsortOption] = useState<string>("0");
  const [clothesInfo, setClothesInfo] = useState<any>([]);
  const [clothesSort, setClothesSort] = useState<any>([]);
  const [color, setColor] = useState<string>("");
  const [size, setSize] = useState<string>("");

  useEffect(() => {
    setClothesInfo(data.products);
    setClothesSort(data.products);

    const handleSortOption = (sortOption: string) => {
      if (sortOption === "1") {
        return;
      }

      if (sortOption === "2") {
        const mostRecent = [...clothesInfo].sort((a, b) =>
          a.date < b.date ? -1 : 1
        );
        setClothesInfo(mostRecent);
      }
      if (sortOption === "3") {
        const lowerValue = [...clothesInfo].sort((a, b) =>
          a.price < b.price ? -1 : 1
        );
        setClothesInfo(lowerValue);
      }
      if (sortOption === "4") {
        const highestValue = [...clothesInfo].sort((a, b) =>
          a.price < b.price ? 1 : -1
        );
        setClothesInfo(highestValue);
      }      
    };

    handleSortOption(sortOption);
  }, [sortOption, color, size]);

  const handleColor = (color: string) => {
    if (color === "Todas as cores") {
      setClothesInfo(data.products);
    } else {
      const filterByColor = data.products.filter(
        (clothesColor: { color: string }) => clothesColor.color === color
      );

      setClothesInfo(filterByColor);
    }
  };

  const handleSize = (size: string) => {
    if (size === "Todos os tamanhos") {
      console.log(size);
      setClothesInfo(data.products);
    }

    const sizeArray: {
      id: string;
      name: string;
      price: number;
      parcelamento: number[];
      color: string;
      image: string;
      size: string[];
      date: string;
    }[] = [];

    const mappedSize = [...data.products].map((item) => {
      if (item.size.includes(size)) {
        sizeArray.push(item);
      }
    });
    setClothesInfo(sizeArray);
  };

  const colorsSet = new Set(clothesSort.map((item: any) => item.color));
  const colorsArray = [...colorsSet].sort();
  colorsArray.push("Todas as cores");

  const sizeSet = new Set(clothesSort.map((item: any) => item.size));
  const sizeArray = [...sizeSet];

  const newSizeArray = sizeArray.flat(1);
  const newSizeSet = new Set(newSizeArray);
  const finalSizeArray = [...newSizeSet].sort();
  finalSizeArray.push("Todos os tamanhos");

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
            {colorsArray
              ? colorsArray.map((item: any, id) => (
                  <div key={id}>
                    <input
                      value={color}
                      type="radio"
                      name="color-info"
                      onChange={() => handleColor(item)}
                    ></input>
                    <label>{item}</label>
                  </div>
                ))
              : ""}
          </div>
          <div className="colors-container">
            <h3>TAMANHOS</h3>
            {finalSizeArray
              ? finalSizeArray.map((item: any, id) => (
                  <div key={id}>
                    <input
                      type="radio"
                      name="color-info"
                      onChange={() => handleSize(item)}
                    ></input>
                    <label>{item}</label>
                  </div>
                ))
              : ""}
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
