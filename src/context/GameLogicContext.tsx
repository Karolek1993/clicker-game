import { createContext, useContext, useState, useEffect, useRef } from 'react';

import { useTimer_Loop } from '../hooks/Timer';

interface GameLogicContextProps {
  moneyAmount: number;
  cropRespawnTime: number;
  flourRespawnTime: number;

  farmLevel: number;
  wheatFieldAmount: number;
  wheatAmount: number;
  farmWorkersAmount: number;
  wheatStorageUpgradeAmount: number;
  fertilizerAmount: number;
  tractorAmount: number;

  farmLevelMax: number;
  wheatFieldMaxAmount: number;
  farmWorkersMaxAmount: number;
  wheatStorageUpgradeMaxAmount: number;
  fertilizerMaxAmount: number;
  tractorMaxAmount: number;

  farmLevelCost: number;
  wheatFieldCost: number;
  farmWorkerCost: number;
  wheatStorageUpgradeCost: number;
  fertilizerCost: number;
  tractorCost: number;

  wheatStorageAmount: number;

  harvestWheat: () => void;
  sellWheat: (money: number) => void;

  upgradeFarm: (cost: number, amount: number) => void;
  upgradeWheatField: (cost: number, amount: number) => void;
  hireFarmWorker: (cost: number, amount: number) => void;
  upgradeWheatStorage: (cost: number, amount: number) => void;
  upgradeFerilizer: (cost: number, amount: number) => void;
  upgradeTractor: (cost: number, amount: number) => void;

  windmillLevel: number;
  windmillWorkersAmount: number;
  flourAmount: number;
  flourStorageUpgradeAmount: number;

  windmillLevelMax: number;
  windmillWorkersMaxAmount: number;
  flourStorageUpgradeMaxAmount: number;

  windmillLevelCost: number;
  windmillWorkerCost: number;
  flourStorageUpgradeCost: number;

  flourStorageAmount: number;

  makeFlour: () => void;
  sellFlour: (money: number) => void;

  upgradeWindmill: (cost: number, amount: number) => void;
  hireWindmillWorker: (cost: number, amount: number) => void;
  upgradeFlourStorage: (cost: number, amount: number) => void;

  saveGame: () => void;
  loadGame: () => void;
}

const GameLogicContext = createContext<GameLogicContextProps | undefined>(undefined);

export function GameLogicContextProvider({ children }: { children: React.ReactNode }) {
  const [moneyAmount, setMoneyAmount] = useState<number>(Infinity);
  const [cropRespawnTime, setCropRespawnTime] = useState<number>(60);
  const [flourRespawnTime, setFlourRespawnTime] = useState<number>(60);

  const [farmLevel, setFarmLevel] = useState<number>(1);
  const [wheatFieldAmount, setWheatFieldAmount] = useState<number>(0);
  const [wheatAmount, setWheatAmount] = useState<number>(0);
  const [farmWorkersAmount, setFarmWorkersAmount] = useState<number>(0);
  const [wheatStorageUpgradeAmount, setWheatStorageUpgradeAmount] = useState<number>(0);
  const [fertilizerAmount, setFerilizerAmount] = useState<number>(0);
  const [tractorAmount, setTractorAmount] = useState<number>(0);

  const [farmLevelMax] = useState<number>(10);
  const [wheatFieldMaxAmount, setWheatFieldMaxAmount] = useState<number>(9);
  const [farmWorkersMaxAmount, setFarmWorkersMaxAmount] = useState<number>(10);
  const [wheatStorageUpgradeMaxAmount, setWheatStorageUpgradeMaxAmount] = useState<number>(10);
  const [fertilizerMaxAmount, setFertilizerMaxAmount] = useState<number>(20);
  const [tractorMaxAmount, setTractorMaxAmount] = useState<number>(15);

  const [farmLevelCost, setFarmLevelCost] = useState<number>(100000);
  const [wheatFieldCost, setWheatFieldCost] = useState<number>(2500);
  const [farmWorkerCost, setFarmWorkerCost] = useState<number>(100);
  const [wheatStorageUpgradeCost, setWheatStorageUpgradeCost] = useState<number>(5000);
  const [fertilizerCost, setFertilizerCost] = useState<number>(350);
  const [tractorCost, setTractorCost] = useState<number>(50000);

  const [wheatStorageAmount, setWheatStorageAmount] = useState<number>(100);

  const [autoHarvestTargetSeconds, setAutoHarvestTargetSeconds] = useState<number>(60000); // 1000 ms = 1 seconds

  const [windmillLevel, setWindmillLevel] = useState<number>(1);
  const [windmillWorkersAmount, setWindmillWorkersAmount] = useState<number>(0);
  const [flourAmount, setFlourAmount] = useState<number>(0);
  const [flourStorageUpgradeAmount, setFlourStorageUpgradeAmount] = useState<number>(0);

  const [windmillLevelMax] = useState<number>(10);
  const [windmillWorkersMaxAmount, setWindmillWorkersMaxAmount] = useState<number>(10);
  const [flourStorageUpgradeMaxAmount, setFlourStorageUpgradeMaxAmount] = useState<number>(10);

  const [windmillLevelCost, setWindmillLevelCost] = useState<number>(100000);
  const [windmillWorkerCost, setWindmillWorkerCost] = useState<number>(100);
  const [flourStorageUpgradeCost, setFlourStorageUpgradeCost] = useState<number>(5000);

  const [flourStorageAmount, setFlourStorageAmount] = useState<number>(100);

  useEffect(() => {
    for (let i = 0; i < farmLevel; i++) {
      if (farmLevel > 1) {
        setWheatFieldMaxAmount(wheatFieldMaxAmount + 1);
        setFarmWorkersMaxAmount(farmWorkersMaxAmount + 5);
        setWheatStorageUpgradeMaxAmount(wheatStorageUpgradeMaxAmount + 5);
        setFertilizerMaxAmount(fertilizerMaxAmount + 5);
        setFarmLevelCost(farmLevelCost * farmLevel);
      }
    }
  }, [farmLevel]);

  useEffect(() => {
    for (let i = 0; i < wheatFieldAmount; i++) {
      setWheatFieldCost(wheatFieldCost * wheatFieldAmount);
    }
  }, [wheatFieldAmount]);

  useEffect(() => {
    for (let i = 0; i < farmWorkersAmount; i++) {
      setCropRespawnTime(cropRespawnTime - 1);
      setFarmWorkerCost(farmWorkerCost * farmWorkersAmount);
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
    }

    switch (tractorAmount) {
      case 1:
        setAutoHarvestTargetSeconds(60000);
        break;
      case 2:
        setAutoHarvestTargetSeconds(56000);
        break;
      case 3:
        setAutoHarvestTargetSeconds(52000);
        break;
      case 4:
        setAutoHarvestTargetSeconds(48000);
        break;
      case 5:
        setAutoHarvestTargetSeconds(44000);
        break;
      case 6:
        setAutoHarvestTargetSeconds(40000);
        break;
      case 7:
        setAutoHarvestTargetSeconds(36000);
        break;
      case 8:
        setAutoHarvestTargetSeconds(32000);
        break;
      case 9:
        setAutoHarvestTargetSeconds(28000);
        break;
      case 10:
        setAutoHarvestTargetSeconds(24000);
        break;
      case 11:
        setAutoHarvestTargetSeconds(20000);
        break;
      case 12:
        setAutoHarvestTargetSeconds(16000);
        break;
      case 13:
        setAutoHarvestTargetSeconds(12000);
        break;
      case 14:
        setAutoHarvestTargetSeconds(8000);
        break;
      case 15:
        setAutoHarvestTargetSeconds(4000);
        break;
    }
  }, [tractorAmount]);

  useTimer_Loop({ target: autoHarvestTargetSeconds, callback: autoHarvestWheat });

  useEffect(() => {
    for (let i = 0; i < windmillLevel; i++) {
      if (windmillLevel > 1) {
        setWindmillWorkersMaxAmount(windmillWorkersMaxAmount + 5);
        setFlourStorageUpgradeMaxAmount(flourStorageUpgradeMaxAmount + 5);
        setWindmillLevelCost(windmillLevelCost * windmillLevel);
      }
    }
  }, [windmillLevel]);

  useEffect(() => {
    for (let i = 0; i < windmillWorkersAmount; i++) {
      setFlourRespawnTime(flourRespawnTime - 1);
      setWindmillWorkerCost(windmillWorkerCost * windmillWorkersAmount);
    }
  }, [windmillWorkersAmount]);

  useEffect(() => {
    for (let i = 0; i < flourStorageUpgradeAmount; i++) {
      setFlourStorageUpgradeCost(flourStorageUpgradeCost * flourStorageUpgradeAmount);
    }
  }, [flourStorageUpgradeAmount]);

  function autoHarvestWheat() {
    if (wheatAmount < wheatStorageAmount && tractorAmount > 0) {
      harvestWheat();
    }
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

  function sellWheat(money: number) {
    if (wheatAmount <= 0) {
      return;
    }

    const currentWheat = wheatAmount;

    setWheatAmount(wheatAmount - currentWheat);
    setMoneyAmount(moneyAmount + currentWheat * money);
  }

  function hireFarmWorker(cost: number, amount: number) {
    if (moneyAmount < cost || farmWorkersAmount >= farmWorkersMaxAmount) {
      return;
    }

    setFarmWorkersAmount(farmWorkersAmount + amount);
    setMoneyAmount(moneyAmount - cost);
  }

  function upgradeFarm(cost: number, amount: number) {
    if (moneyAmount < cost || farmLevel >= 10) {
      return;
    }

    setFarmLevel(farmLevel + amount);
    setMoneyAmount(moneyAmount - cost);
  }

  function upgradeWheatField(cost: number, amount: number) {
    if (moneyAmount < cost || wheatFieldAmount >= wheatFieldMaxAmount) {
      return;
    }

    setWheatFieldAmount(wheatFieldAmount + amount);
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

  function makeFlour() {
    let newFlour: number = flourAmount;

    newFlour += 1;
    setWheatAmount(wheatAmount - 2);

    if (newFlour >= flourStorageAmount) {
      newFlour = flourStorageAmount;
    }

    setFlourAmount(newFlour);
  }

  function sellFlour(money: number) {
    if (flourAmount <= 0) {
      return;
    }

    const currentFlour = flourAmount;

    setFlourAmount(flourAmount - currentFlour);
    setMoneyAmount(moneyAmount + currentFlour * money);
  }

  function upgradeWindmill(cost: number, amount: number) {
    if (moneyAmount < cost || windmillLevel >= windmillLevelMax) {
      return;
    }

    setWindmillLevel(windmillLevel + amount);
    setMoneyAmount(moneyAmount - cost);
  }

  function hireWindmillWorker(cost: number, amount: number) {
    if (moneyAmount < cost || windmillWorkersAmount >= windmillWorkersMaxAmount) {
      return;
    }

    setWindmillWorkersAmount(windmillWorkersAmount + amount);
    setMoneyAmount(moneyAmount - cost);
  }

  function upgradeFlourStorage(cost: number, amount: number) {
    if (moneyAmount < cost || flourStorageUpgradeAmount >= flourStorageUpgradeMaxAmount) {
      return;
    }

    setFlourStorageUpgradeAmount(flourStorageUpgradeAmount + 1);
    setFlourStorageAmount(flourStorageAmount + amount);
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
        localStorage.setItem('farmWorkers', farmWorkersAmount.toString());
        localStorage.setItem('farmWorkersCost', farmWorkerCost.toString());
        localStorage.setItem('wheatStorageUpgrade', wheatStorageUpgradeAmount.toString());
        localStorage.setItem('wheatStorageUpgradeCost', wheatStorageUpgradeCost.toString());
        localStorage.setItem('fertilizer', fertilizerAmount.toString());
        localStorage.setItem('fertilizerCost', fertilizerCost.toString());
        localStorage.setItem('tractor', tractorAmount.toString());
        localStorage.setItem('tractorCost', tractorCost.toString());
        localStorage.setItem('wheatStorage', wheatStorageAmount.toString());
        localStorage.setItem('targetSeconds', autoHarvestTargetSeconds.toString());
        localStorage.setItem('farmWorkersMaxAmount', farmWorkersMaxAmount.toString());
        localStorage.setItem('wheatStorageUpgradeMaxAmount', wheatStorageUpgradeMaxAmount.toString());
        localStorage.setItem('fertilizerMaxAmount', fertilizerMaxAmount.toString());
        localStorage.setItem('tractorMaxAmount', tractorMaxAmount.toString());
        localStorage.setItem('farmLevel', farmLevel.toString());
        localStorage.setItem('farmLevelCost', farmLevelCost.toString());
        localStorage.setItem('wheatFieldAmount', wheatFieldAmount.toString());
        localStorage.setItem('wheatFieldCost', wheatFieldCost.toString());
        localStorage.setItem('windmillLevel', windmillLevel.toString());
        localStorage.setItem('windmillWorkersAmount', windmillWorkersAmount.toString());
        localStorage.setItem('windmillWorkersCost', windmillWorkerCost.toString());
        localStorage.setItem('windmillLevelCost', windmillLevelCost.toString());
        localStorage.setItem('windmillWorkersMaxAmount', windmillWorkersMaxAmount.toString());
        localStorage.setItem('flourAmount', flourAmount.toString());
        localStorage.setItem('flourStorageAmount', flourStorageAmount.toString());
        localStorage.setItem('flourStorageUpgradeAmount', flourStorageUpgradeAmount.toString());
        localStorage.setItem('flourStorageUpgradeCost', flourStorageUpgradeCost.toString());
        localStorage.setItem('flourStorageUpgradeMaxAmount', flourStorageUpgradeMaxAmount.toString());
        localStorage.setItem('windmillLevelMax', windmillLevelMax.toString());
        localStorage.setItem('windmillWorkersMaxAmount', windmillWorkersMaxAmount.toString());
      }, 500);
    }, [
      moneyAmount,
      wheatAmount,
      farmWorkersAmount,
      farmWorkerCost,
      wheatStorageUpgradeAmount,
      wheatStorageUpgradeCost,
      fertilizerAmount,
      fertilizerCost,
      tractorAmount,
      tractorCost,
      wheatStorageAmount,
      farmWorkersMaxAmount,
      wheatStorageUpgradeMaxAmount,
      fertilizerMaxAmount,
      tractorMaxAmount,
      farmLevel,
      farmLevelCost,
      wheatFieldAmount,
      wheatFieldCost,
      windmillLevel,
      windmillWorkersAmount,
      windmillWorkerCost,
      windmillLevelCost,
      windmillWorkersMaxAmount,
      flourAmount,
      flourStorageAmount,
      flourStorageUpgradeAmount,
      flourStorageUpgradeCost,
      flourStorageUpgradeMaxAmount,
    ]);
  }

  function loadGame() {
    useEffect(() => {
      const savedMoney = localStorage.getItem('money');
      const savedWheat = localStorage.getItem('wheat');
      const savedFarmWorkers = localStorage.getItem('farmWorkers');
      const savedFarmWorkersCost = localStorage.getItem('farmWorkersCost');
      const savedWheatStorageUpgrade = localStorage.getItem('wheatStorageUpgrade');
      const savedWheatStorageUpgradeCost = localStorage.getItem('wheatStorageUpgradeCost');
      const savedFertilizer = localStorage.getItem('fertilizer');
      const savedFertilizerCost = localStorage.getItem('fertilizerCost');
      const savedTractor = localStorage.getItem('tractor');
      const savedTractorCost = localStorage.getItem('tractorCost');
      const savedWheatStorage = localStorage.getItem('wheatStorage');
      const savedTargetSeconds = localStorage.getItem('targetSeconds');
      const savedFarmWorkersMaxAmount = localStorage.getItem('farmWorkersMaxAmount');
      const savedWheatStorageUpgradeMaxAmount = localStorage.getItem('wheatStorageUpgradeMaxAmount');
      const savedFertilizerMaxAmount = localStorage.getItem('fertilizerMaxAmount');
      const savedTractorMaxAmount = localStorage.getItem('tractorMaxAmount');
      const savedFarmLevel = localStorage.getItem('farmLevel');
      const savedFarmLevelCost = localStorage.getItem('farmLevelCost');
      const savedWheatFieldAmount = localStorage.getItem('wheatFieldAmount');
      const savedWheatFieldCost = localStorage.getItem('wheatFieldCost');
      const savedWindmillLevel = localStorage.getItem('windmillLevel');
      const savedWindmillWorkersAmount = localStorage.getItem('windmillWorkersAmount');
      const savedWindmillWorkersCost = localStorage.getItem('windmillWorkersCost');
      const savedWindmillLevelCost = localStorage.getItem('windmillLevelCost');
      const savedFlourAmount = localStorage.getItem('flourAmount');
      const savedFlourStorageAmount = localStorage.getItem('flourStorageAmount');
      const savedFlourStorageUpgradeAmount = localStorage.getItem('flourStorageUpgradeAmount');
      const savedFlourStorageUpgradeCost = localStorage.getItem('flourStorageUpgradeCost');
      const savedFlourStorageUpgradeMaxAmount = localStorage.getItem('flourStorageUpgradeMaxAmount');
      const savedWindmillLevelMax = localStorage.getItem('windmillLevelMax');
      const savedWindmillWorkersMaxAmount = localStorage.getItem('windmillWorkersMaxAmount');

      if (
        savedMoney &&
        savedWheat &&
        savedFarmWorkers &&
        savedFarmWorkersCost &&
        savedWheatStorageUpgrade &&
        savedWheatStorageUpgradeCost &&
        savedFertilizer &&
        savedFertilizerCost &&
        savedTractor &&
        savedTractorCost &&
        savedWheatStorage &&
        savedTargetSeconds &&
        savedFarmWorkersMaxAmount &&
        savedWheatStorageUpgradeMaxAmount &&
        savedFertilizerMaxAmount &&
        savedTractorMaxAmount &&
        savedFarmLevel &&
        savedFarmLevelCost &&
        savedWheatFieldAmount &&
        savedWheatFieldCost &&
        savedWindmillLevel &&
        savedWindmillWorkersAmount &&
        savedWindmillWorkersCost &&
        savedWindmillLevelCost &&
        savedFlourAmount &&
        savedFlourStorageAmount &&
        savedFlourStorageUpgradeAmount &&
        savedFlourStorageUpgradeCost &&
        savedFlourStorageUpgradeMaxAmount &&
        savedWindmillLevelMax &&
        savedWindmillWorkersMaxAmount
      ) {
        setMoneyAmount(parseInt(savedMoney));
        setWheatAmount(parseInt(savedWheat));
        setFarmWorkersAmount(parseInt(savedFarmWorkers));
        setFarmWorkerCost(parseInt(savedFarmWorkersCost));
        setWheatStorageUpgradeAmount(parseInt(savedWheatStorageUpgrade));
        setWheatStorageUpgradeCost(parseInt(savedWheatStorageUpgradeCost));
        setFerilizerAmount(parseInt(savedFertilizer));
        setFertilizerCost(parseInt(savedFertilizerCost));
        setTractorAmount(parseInt(savedTractor));
        setTractorCost(parseInt(savedTractorCost));
        setWheatStorageAmount(parseInt(savedWheatStorage));
        setAutoHarvestTargetSeconds(parseInt(savedTargetSeconds));
        setFarmWorkersMaxAmount(parseInt(savedFarmWorkersMaxAmount));
        setWheatStorageUpgradeMaxAmount(parseInt(savedWheatStorageUpgradeMaxAmount));
        setFertilizerMaxAmount(parseInt(savedFertilizerMaxAmount));
        setTractorMaxAmount(parseInt(savedTractorMaxAmount));
        setFarmLevel(parseInt(savedFarmLevel));
        setFarmLevelCost(parseInt(savedFarmLevelCost));
        setWheatFieldAmount(parseInt(savedWheatFieldAmount));
        setWheatFieldCost(parseInt(savedWheatFieldCost));
        setWindmillLevel(parseInt(savedWindmillLevel));
        setWindmillWorkersAmount(parseInt(savedWindmillWorkersAmount));
        setWindmillWorkerCost(parseInt(savedWindmillWorkersCost));
        setWindmillLevelCost(parseInt(savedWindmillLevelCost));
        setFlourAmount(parseInt(savedFlourAmount));
        setFlourStorageAmount(parseInt(savedFlourStorageAmount));
        setFlourStorageUpgradeAmount(parseInt(savedFlourStorageUpgradeAmount));
        setFlourStorageUpgradeCost(parseInt(savedFlourStorageUpgradeCost));
        setFlourStorageUpgradeMaxAmount(parseInt(savedFlourStorageUpgradeMaxAmount));
        setWindmillWorkersMaxAmount(parseInt(savedWindmillWorkersMaxAmount));
      }
    }, []);
  }

  return (
    <GameLogicContext.Provider
      value={{
        moneyAmount,
        cropRespawnTime,
        flourRespawnTime,
        farmLevel,
        wheatFieldAmount,
        wheatAmount,
        farmWorkersAmount,
        wheatStorageUpgradeAmount,
        wheatStorageAmount,
        fertilizerAmount,
        tractorAmount,
        farmLevelMax,
        wheatFieldMaxAmount,
        farmWorkersMaxAmount,
        wheatStorageUpgradeMaxAmount,
        fertilizerMaxAmount,
        tractorMaxAmount,
        farmLevelCost,
        wheatFieldCost,
        farmWorkerCost,
        wheatStorageUpgradeCost,
        fertilizerCost,
        tractorCost,
        upgradeFarm,
        harvestWheat,
        sellWheat,
        hireFarmWorker,
        upgradeWheatField,
        upgradeWheatStorage,
        upgradeFerilizer,
        upgradeTractor,
        windmillLevel,
        windmillWorkersAmount,
        flourAmount,
        flourStorageUpgradeAmount,
        windmillLevelMax,
        windmillWorkersMaxAmount,
        flourStorageUpgradeMaxAmount,
        windmillLevelCost,
        windmillWorkerCost,
        flourStorageUpgradeCost,
        upgradeWindmill,
        hireWindmillWorker,
        upgradeFlourStorage,
        flourStorageAmount,
        makeFlour,
        sellFlour,

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
