import { createContext, useContext, useState, useEffect, useRef } from 'react';

interface GameLogicContextProps {
  moneyAmount: number;
  cropRespawnTime: number;

  farmLevel: number;

  wheatAmount: number;
  flourAmount: number;
  breadAmount: number;

  farmWorkersAmount: number;
  windmillWorkersAmount: number;
  bakeryWorkersAmount: number;
  wheatStorageUpgradeAmount: number;
  flourStorageUpgradeAmount: number;
  breadStorageUpgradeAmount: number;
  fertilizerAmount: number;
  tractorAmount: number;

  farmLevelMax: number;

  farmWorkersMaxAmount: number;
  windmillWorkersMaxAmount: number;
  bakeryWorkersMaxAmount: number;
  wheatStorageUpgradeMaxAmount: number;
  flourStorageUpgradeMaxAmount: number;
  breadStorageUpgradeMaxAmount: number;
  fertilizerMaxAmount: number;
  tractorMaxAmount: number;

  farmLevelCost: number;
  farmWorkerCost: number;
  wheatStorageUpgradeCost: number;
  fertilizerCost: number;
  tractorCost: number;

  wheatStorageAmount: number;
  flourStorageAmount: number;
  breadStorageAmount: number;

  upgradeFarm: (cost: number, amount: number) => void;

  harvestWheat: () => void;
  makeFlour: () => void;
  bakeBread: () => void;

  sellWheat: (money: number) => void;
  sellFlour: (money: number) => void;
  sellBread: (money: number) => void;

  hireFarmWorker: (cost: number, amount: number) => void;
  hireWindmillWorker: (cost: number, amount: number) => void;
  hireBakeryWorker: (cost: number, amount: number) => void;
  upgradeWheatStorage: (cost: number, amount: number) => void;
  upgradeFlourStorage: (cost: number, amount: number) => void;
  upgardeBreadStorage: (cost: number, amount: number) => void;
  upgradeFerilizer: (cost: number, amount: number) => void;
  upgradeTractor: (cost: number, amount: number) => void;

  saveGame: () => void;
  loadGame: () => void;
}

const GameLogicContext = createContext<GameLogicContextProps | undefined>(undefined);

export function GameLogicContextProvider({ children }: { children: React.ReactNode }) {
  const harvestIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [moneyAmount, setMoneyAmount] = useState<number>(Infinity);
  const [cropRespawnTime, setCropRespawnTime] = useState<number>(20);

  const [farmLevel, setFarmLevel] = useState<number>(1);

  const [wheatAmount, setWheatAmount] = useState<number>(0);
  const [flourAmount, setFlourAmount] = useState<number>(0);
  const [breadAmount, setBreadAmount] = useState<number>(0);

  const [farmWorkersAmount, setFarmWorkersAmount] = useState<number>(0);
  const [windmillWorkersAmount, setWindmillWorkersAmount] = useState<number>(0);
  const [bakeryWorkersAmount, setBakeryWorkersAmount] = useState<number>(0);
  const [wheatStorageUpgradeAmount, setWheatStorageUpgradeAmount] = useState<number>(0);
  const [flourStorageUpgradeAmount, setFlourStorageUpgradeAmount] = useState<number>(0);
  const [breadStorageUpgradeAmount, setBreadStorageUpgradeAmount] = useState<number>(0);
  const [fertilizerAmount, setFerilizerAmount] = useState<number>(0);
  const [tractorAmount, setTractorAmount] = useState<number>(0);

  const [farmLevelMax] = useState<number>(10);

  const [farmWorkersMaxAmount, setFarmWorkersMaxAmount] = useState<number>(10);
  const [windmillWorkersMaxAmount, setWindmillWorkersMaxAmount] = useState<number>(10);
  const [bakeryWorkersMaxAmount, setBakeryWorkersMaxAmount] = useState<number>(10);
  const [wheatStorageUpgradeMaxAmount, setWheatStorageUpgradeMaxAmount] = useState<number>(10);
  const [flourStorageUpgradeMaxAmount, setFlourStorageUpgradeMaxAmount] = useState<number>(10);
  const [breadStorageUpgradeMaxAmount, setBreadStorageUpgradeMaxAmount] = useState<number>(10);
  const [fertilizerMaxAmount, setFertilizerMaxAmount] = useState<number>(20);
  const [tractorMaxAmount, setTractorMaxAmount] = useState<number>(15);

  const [farmLevelCost, setFarmLevelCost] = useState<number>(100000);
  const [farmWorkerCost, setFarmWorkerCost] = useState<number>(100);
  const [wheatStorageUpgradeCost, setWheatStorageUpgradeCost] = useState<number>(5000);
  const [fertilizerCost, setFertilizerCost] = useState<number>(350);
  const [tractorCost, setTractorCost] = useState<number>(50000);

  const [wheatStorageAmount, setWheatStorageAmount] = useState<number>(100);
  const [flourStorageAmount, setFlourStorageAmount] = useState<number>(100);
  const [breadStorageAmount, setBreadStorageAmount] = useState<number>(100);

  const [autoHarvestTargetSeconds, setAutoHarvestTargetSeconds] = useState<number>(60000); // 1000 ms = 1 seconds

  useEffect(() => {
    for (let i = 0; i < farmLevel; i++) {
      if (farmLevel > 1) {
        setFarmWorkersMaxAmount(farmWorkersMaxAmount + 5);
        setWheatStorageUpgradeMaxAmount(wheatStorageUpgradeMaxAmount + 5);
        setFertilizerMaxAmount(fertilizerMaxAmount + 5);
        setTractorMaxAmount(tractorMaxAmount + 5);
        setFarmLevelCost(farmLevelCost * farmLevel * 2);
      }
    }
  }, [farmLevel]);

  useEffect(() => {
    for (let i = 0; i < farmWorkersAmount; i++) {
      setCropRespawnTime(cropRespawnTime - 2);
      setFarmWorkerCost(farmWorkerCost * farmWorkersAmount);

      if (farmWorkersAmount >= 10) {
        setCropRespawnTime(0);
      }
    }
  }, [farmWorkersAmount]);

  useEffect(() => {
    for (let i = 0; i < wheatStorageUpgradeAmount; i++) {
      setWheatStorageUpgradeCost(wheatStorageUpgradeCost * wheatStorageUpgradeAmount);
    }
  }, [wheatStorageUpgradeAmount]);

  useEffect(() => {
    for (let i = 0; i < fertilizerAmount; i++) {
      setFertilizerCost(fertilizerCost * fertilizerAmount);
    }
  }, [fertilizerAmount]);

  useEffect(() => {
    for (let i = 0; i < tractorAmount; i++) {
      setTractorCost(tractorCost * tractorAmount);
      setAutoHarvestTargetSeconds(autoHarvestTargetSeconds - tractorAmount * 450);
    }
  }, [tractorAmount]);

  useEffect(() => {
    harvestIntervalRef.current = setInterval(() => {
      if (wheatAmount < wheatStorageAmount && tractorAmount > 0) {
        harvestWheat();
      }
    }, autoHarvestTargetSeconds);

    return () => {
      if (harvestIntervalRef.current) {
        clearInterval(harvestIntervalRef.current);
      }
    };
  }, [harvestIntervalRef.current]);

  function upgradeFarm(cost: number, amount: number) {
    if (moneyAmount < cost || farmLevel >= 10) {
      return;
    }

    setFarmLevel(farmLevel + amount);
    setMoneyAmount(moneyAmount - cost);
  }

  function harvestWheat() {
    let newWheat: number = wheatAmount;

    if (fertilizerAmount > 0) {
      newWheat += fertilizerAmount * 2;
    } else {
      newWheat += 1;
    }

    if (newWheat > wheatStorageAmount) {
      newWheat = wheatStorageAmount;
    }

    setWheatAmount(newWheat);
  }

  function makeFlour() {
    let newFlour: number = flourAmount;

    newFlour += 1;

    if (newFlour > flourStorageAmount) {
      newFlour = flourStorageAmount;
    }

    setFlourAmount(newFlour);
  }

  function bakeBread() {
    let newBread: number = breadAmount;

    newBread += 1;

    if (newBread > breadStorageAmount) {
      newBread = breadStorageAmount;
    }

    setBreadAmount(newBread);
  }

  function sellWheat(money: number) {
    if (wheatAmount <= 0) {
      return;
    }

    const currentWheat = wheatAmount;

    setWheatAmount(wheatAmount - currentWheat);
    setMoneyAmount(moneyAmount + currentWheat * money);
  }

  function sellFlour(money: number) {
    if (flourAmount <= 0) {
      return;
    }

    setFlourAmount(flourAmount - 1);
    setMoneyAmount(moneyAmount + money);
  }

  function sellBread(money: number) {
    if (breadAmount <= 0) {
      return;
    }

    setBreadAmount(breadAmount - 1);
    setMoneyAmount(moneyAmount + money);
  }

  function hireFarmWorker(cost: number, amount: number) {
    if (moneyAmount < cost || farmWorkersAmount >= farmWorkersMaxAmount) {
      return;
    }

    setFarmWorkersAmount(farmWorkersAmount + amount);
    setMoneyAmount(moneyAmount - cost);
  }

  function hireWindmillWorker(cost: number, amount: number) {
    if (moneyAmount < cost || windmillWorkersAmount >= windmillWorkersMaxAmount) {
      return;
    }

    setWindmillWorkersAmount(windmillWorkersAmount + amount);
    setMoneyAmount(moneyAmount - cost);
  }

  function hireBakeryWorker(cost: number, amount: number) {
    if (moneyAmount < cost || bakeryWorkersAmount >= bakeryWorkersMaxAmount) {
      return;
    }

    setBakeryWorkersAmount(bakeryWorkersAmount + amount);
    setMoneyAmount(moneyAmount - cost);
  }

  function upgradeWheatStorage(cost: number, amount: number) {
    if (moneyAmount < cost || wheatStorageUpgradeAmount >= wheatStorageUpgradeMaxAmount) {
      return;
    }

    setMoneyAmount(moneyAmount - cost);
    setWheatStorageUpgradeAmount(wheatStorageUpgradeAmount + 1);
    setWheatStorageAmount(wheatStorageAmount + amount);
  }

  function upgradeFlourStorage(cost: number, amount: number) {
    if (moneyAmount < cost || flourStorageUpgradeAmount >= flourStorageUpgradeMaxAmount) {
      return;
    }

    setFlourStorageAmount(flourStorageAmount + amount);
    setFlourStorageUpgradeAmount(flourStorageUpgradeAmount + 1);
    setMoneyAmount(moneyAmount - cost);
  }

  function upgardeBreadStorage(cost: number, amount: number) {
    if (moneyAmount < cost || breadStorageUpgradeAmount >= breadStorageUpgradeMaxAmount) {
      return;
    }

    setBreadStorageAmount(breadStorageAmount + amount);
    setBreadStorageUpgradeAmount(breadStorageUpgradeAmount + 1);
    setMoneyAmount(moneyAmount - cost);
  }

  function upgradeFerilizer(cost: number, amount: number) {
    if (moneyAmount < cost || fertilizerAmount >= fertilizerMaxAmount) {
      return;
    }

    setFerilizerAmount(fertilizerAmount + amount);
    setMoneyAmount(moneyAmount - cost);
  }

  function upgradeTractor(cost: number, amount: number) {
    if (moneyAmount < cost || tractorAmount >= tractorMaxAmount) {
      return;
    }

    setTractorAmount(tractorAmount + amount);
    setMoneyAmount(moneyAmount - cost);
  }

  function saveGame() {
    const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }

      timeout.current = setTimeout(() => {
        localStorage.setItem('money', moneyAmount.toString());
        localStorage.setItem('wheat', wheatAmount.toString());
        localStorage.setItem('flour', flourAmount.toString());
        localStorage.setItem('bread', breadAmount.toString());
        localStorage.setItem('farmWorkers', farmWorkersAmount.toString());
        localStorage.setItem('windmillWorkers', windmillWorkersAmount.toString());
        localStorage.setItem('bakeryWorkers', bakeryWorkersAmount.toString());
        localStorage.setItem('farmWorkersCost', farmWorkerCost.toString());
        localStorage.setItem('wheatStorageUpgrade', wheatStorageUpgradeAmount.toString());
        localStorage.setItem('flourStorageUpgrade', flourStorageUpgradeAmount.toString());
        localStorage.setItem('breadStorageUpgrade', breadStorageUpgradeAmount.toString());
        localStorage.setItem('wheatStorageUpgradeCost', wheatStorageUpgradeCost.toString());
        localStorage.setItem('fertilizer', fertilizerAmount.toString());
        localStorage.setItem('fertilizerCost', fertilizerCost.toString());
        localStorage.setItem('tractor', tractorAmount.toString());
        localStorage.setItem('tractorCost', tractorCost.toString());
        localStorage.setItem('wheatStorage', wheatStorageAmount.toString());
        localStorage.setItem('flourStorage', flourStorageAmount.toString());
        localStorage.setItem('breadStorage', breadStorageAmount.toString());
        localStorage.setItem('targetSeconds', autoHarvestTargetSeconds.toString());
        localStorage.setItem('harvestIntervalRef', JSON.stringify(harvestIntervalRef.current));
        localStorage.setItem('farmWorkersMaxAmount', farmWorkersMaxAmount.toString());
        localStorage.setItem('windmillWorkersMaxAmount', windmillWorkersMaxAmount.toString());
        localStorage.setItem('bakeryWorkersMaxAmount', bakeryWorkersMaxAmount.toString());
        localStorage.setItem('wheatStorageUpgradeMaxAmount', wheatStorageUpgradeMaxAmount.toString());
        localStorage.setItem('flourStorageUpgradeMaxAmount', flourStorageUpgradeMaxAmount.toString());
        localStorage.setItem('breadStorageUpgradeMaxAmount', breadStorageUpgradeMaxAmount.toString());
        localStorage.setItem('fertilizerMaxAmount', fertilizerMaxAmount.toString());
        localStorage.setItem('tractorMaxAmount', tractorMaxAmount.toString());
        localStorage.setItem('farmLevel', farmLevel.toString());
        localStorage.setItem('farmLevelCost', farmLevelCost.toString());
      }, 500);
    }, [
      moneyAmount,
      wheatAmount,
      flourAmount,
      breadAmount,
      farmWorkersAmount,
      windmillWorkersAmount,
      bakeryWorkersAmount,
      farmWorkerCost,
      wheatStorageUpgradeAmount,
      flourStorageUpgradeAmount,
      breadStorageUpgradeAmount,
      wheatStorageUpgradeCost,
      fertilizerAmount,
      fertilizerCost,
      tractorAmount,
      tractorCost,
      wheatStorageAmount,
      flourStorageAmount,
      breadStorageAmount,
      harvestIntervalRef.current,
      farmWorkersMaxAmount,
      windmillWorkersMaxAmount,
      bakeryWorkersMaxAmount,
      wheatStorageUpgradeMaxAmount,
      flourStorageUpgradeMaxAmount,
      breadStorageUpgradeMaxAmount,
      fertilizerMaxAmount,
      tractorMaxAmount,
      farmLevel,
      farmLevelCost,
    ]);
  }

  function loadGame() {
    useEffect(() => {
      const savedMoney = localStorage.getItem('money');
      const savedWheat = localStorage.getItem('wheat');
      const savedFlour = localStorage.getItem('flour');
      const savedBread = localStorage.getItem('bread');
      const savedFarmWorkers = localStorage.getItem('farmWorkers');
      const savedWindmillWorkers = localStorage.getItem('windmillWorkers');
      const savedBakeryWorkers = localStorage.getItem('bakeryWorkers');
      const savedFarmWorkersCost = localStorage.getItem('farmWorkersCost');
      const savedWheatStorageUpgrade = localStorage.getItem('wheatStorageUpgrade');
      const savedFlourStorageUpgrade = localStorage.getItem('flourStorageUpgrade');
      const savedBreadStorageUpgrade = localStorage.getItem('breadStorageUpgrade');
      const savedWheatStorageUpgradeCost = localStorage.getItem('wheatStorageUpgradeCost');
      const savedFertilizer = localStorage.getItem('fertilizer');
      const savedFertilizerCost = localStorage.getItem('fertilizerCost');
      const savedTractor = localStorage.getItem('tractor');
      const savedTractorCost = localStorage.getItem('tractorCost');
      const savedWheatStorage = localStorage.getItem('wheatStorage');
      const savedFlourStorage = localStorage.getItem('flourStorage');
      const savedBreadStorage = localStorage.getItem('breadStorage');
      const savedTargetSeconds = localStorage.getItem('targetSeconds');
      const savedHarvestIntervalRef = localStorage.getItem('harvestIntervalRef');
      const savedFarmWorkersMaxAmount = localStorage.getItem('farmWorkersMaxAmount');
      const savedWindmillWorkersMaxAmount = localStorage.getItem('windmillWorkersMaxAmount');
      const savedBakeryWorkersMaxAmount = localStorage.getItem('bakeryWorkersMaxAmount');
      const savedWheatStorageUpgradeMaxAmount = localStorage.getItem('wheatStorageUpgradeMaxAmount');
      const savedFlourStorageUpgradeMaxAmount = localStorage.getItem('flourStorageUpgradeMaxAmount');
      const savedBreadStorageUpgradeMaxAmount = localStorage.getItem('breadStorageUpgradeMaxAmount');
      const savedFertilizerMaxAmount = localStorage.getItem('fertilizerMaxAmount');
      const savedTractorMaxAmount = localStorage.getItem('tractorMaxAmount');
      const savedFarmLevel = localStorage.getItem('farmLevel');
      const savedFarmLevelCost = localStorage.getItem('farmLevelCost');

      if (
        savedMoney &&
        savedWheat &&
        savedFlour &&
        savedBread &&
        savedFarmWorkers &&
        savedWindmillWorkers &&
        savedBakeryWorkers &&
        savedFarmWorkersCost &&
        savedWheatStorageUpgrade &&
        savedFlourStorageUpgrade &&
        savedBreadStorageUpgrade &&
        savedWheatStorageUpgradeCost &&
        savedFertilizer &&
        savedFertilizerCost &&
        savedTractor &&
        savedTractorCost &&
        savedWheatStorage &&
        savedFlourStorage &&
        savedBreadStorage &&
        savedTargetSeconds &&
        savedHarvestIntervalRef &&
        savedFarmWorkersMaxAmount &&
        savedWindmillWorkersMaxAmount &&
        savedBakeryWorkersMaxAmount &&
        savedWheatStorageUpgradeMaxAmount &&
        savedFlourStorageUpgradeMaxAmount &&
        savedBreadStorageUpgradeMaxAmount &&
        savedFertilizerMaxAmount &&
        savedTractorMaxAmount &&
        savedFarmLevel &&
        savedFarmLevelCost
      ) {
        setMoneyAmount(parseInt(savedMoney));
        setWheatAmount(parseInt(savedWheat));
        setFlourAmount(parseInt(savedFlour));
        setBreadAmount(parseInt(savedBread));
        setFarmWorkersAmount(parseInt(savedFarmWorkers));
        setWindmillWorkersAmount(parseInt(savedWindmillWorkers));
        setBakeryWorkersAmount(parseInt(savedBakeryWorkers));
        setFarmWorkerCost(parseInt(savedFarmWorkersCost));
        setWheatStorageUpgradeAmount(parseInt(savedWheatStorageUpgrade));
        setFlourStorageUpgradeAmount(parseInt(savedFlourStorageUpgrade));
        setBreadStorageUpgradeAmount(parseInt(savedBreadStorageUpgrade));
        setWheatStorageUpgradeCost(parseInt(savedWheatStorageUpgradeCost));
        setFerilizerAmount(parseInt(savedFertilizer));
        setFertilizerCost(parseInt(savedFertilizerCost));
        setTractorAmount(parseInt(savedTractor));
        setTractorCost(parseInt(savedTractorCost));
        setWheatStorageAmount(parseInt(savedWheatStorage));
        setFlourStorageAmount(parseInt(savedFlourStorage));
        setBreadStorageAmount(parseInt(savedBreadStorage));
        setAutoHarvestTargetSeconds(parseInt(savedTargetSeconds));
        harvestIntervalRef.current = JSON.parse(savedHarvestIntervalRef);
        setFarmWorkersMaxAmount(parseInt(savedFarmWorkersMaxAmount));
        setWindmillWorkersMaxAmount(parseInt(savedWindmillWorkersMaxAmount));
        setBakeryWorkersMaxAmount(parseInt(savedBakeryWorkersMaxAmount));
        setWheatStorageUpgradeMaxAmount(parseInt(savedWheatStorageUpgradeMaxAmount));
        setFlourStorageUpgradeMaxAmount(parseInt(savedFlourStorageUpgradeMaxAmount));
        setBreadStorageUpgradeMaxAmount(parseInt(savedBreadStorageUpgradeMaxAmount));
        setFertilizerMaxAmount(parseInt(savedFertilizerMaxAmount));
        setTractorMaxAmount(parseInt(savedTractorMaxAmount));
        setFarmLevel(parseInt(savedFarmLevel));
        setFarmLevelCost(parseInt(savedFarmLevelCost));
      }
    }, []);
  }

  return (
    <GameLogicContext.Provider
      value={{
        moneyAmount,
        cropRespawnTime,
        farmLevel,
        wheatAmount,
        flourAmount,
        breadAmount,
        farmWorkersAmount,
        windmillWorkersAmount,
        bakeryWorkersAmount,
        wheatStorageUpgradeAmount,
        flourStorageUpgradeAmount,
        breadStorageUpgradeAmount,
        wheatStorageAmount,
        flourStorageAmount,
        breadStorageAmount,
        fertilizerAmount,
        tractorAmount,
        farmLevelMax,
        farmWorkersMaxAmount,
        windmillWorkersMaxAmount,
        bakeryWorkersMaxAmount,
        wheatStorageUpgradeMaxAmount,
        flourStorageUpgradeMaxAmount,
        breadStorageUpgradeMaxAmount,
        fertilizerMaxAmount,
        tractorMaxAmount,
        farmLevelCost,
        farmWorkerCost,
        wheatStorageUpgradeCost,
        fertilizerCost,
        tractorCost,
        upgradeFarm,
        harvestWheat,
        makeFlour,
        bakeBread,
        sellWheat,
        sellFlour,
        sellBread,
        hireFarmWorker,
        hireWindmillWorker,
        hireBakeryWorker,
        upgradeWheatStorage,
        upgradeFlourStorage,
        upgardeBreadStorage,
        upgradeFerilizer,
        upgradeTractor,

        saveGame,
        loadGame,
      }}
    >
      {children}
    </GameLogicContext.Provider>
  );
}

export function useGameLogicContext() {
  const context = useContext(GameLogicContext);
  if (context === undefined) {
    throw new Error('useGameLogicContext must be used within a GameLogicContextProvider');
  }
  return context;
}
