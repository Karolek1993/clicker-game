import { createContext, useContext, useState, useEffect, useRef } from 'react';

import { useTimer } from '../hooks/Timer';

interface GameLogicContextProps {
  moneyAmount: number;
  cropRespawnTime: number;

  farmLevel: number;

  wheatAmount: number;

  farmWorkersAmount: number;
  wheatStorageUpgradeAmount: number;
  fertilizerAmount: number;
  tractorAmount: number;

  farmLevelMax: number;

  farmWorkersMaxAmount: number;
  wheatStorageUpgradeMaxAmount: number;
  fertilizerMaxAmount: number;
  tractorMaxAmount: number;

  farmLevelCost: number;
  farmWorkerCost: number;
  wheatStorageUpgradeCost: number;
  fertilizerCost: number;
  tractorCost: number;

  wheatStorageAmount: number;

  upgradeFarm: (cost: number, amount: number) => void;

  harvestWheat: () => void;

  sellWheat: (money: number) => void;

  hireFarmWorker: (cost: number, amount: number) => void;
  upgradeWheatStorage: (cost: number, amount: number) => void;
  upgradeFerilizer: (cost: number, amount: number) => void;
  upgradeTractor: (cost: number, amount: number) => void;

  saveGame: () => void;
  loadGame: () => void;
}

const GameLogicContext = createContext<GameLogicContextProps | undefined>(undefined);

export function GameLogicContextProvider({ children }: { children: React.ReactNode }) {
  const [moneyAmount, setMoneyAmount] = useState<number>(100000000);
  const [cropRespawnTime, setCropRespawnTime] = useState<number>(60);

  const [farmLevel, setFarmLevel] = useState<number>(1);

  const [wheatAmount, setWheatAmount] = useState<number>(0);

  const [farmWorkersAmount, setFarmWorkersAmount] = useState<number>(0);
  const [wheatStorageUpgradeAmount, setWheatStorageUpgradeAmount] = useState<number>(0);
  const [fertilizerAmount, setFerilizerAmount] = useState<number>(0);
  const [tractorAmount, setTractorAmount] = useState<number>(0);

  const [farmLevelMax] = useState<number>(10);

  const [farmWorkersMaxAmount, setFarmWorkersMaxAmount] = useState<number>(10);
  const [wheatStorageUpgradeMaxAmount, setWheatStorageUpgradeMaxAmount] = useState<number>(10);
  const [fertilizerMaxAmount, setFertilizerMaxAmount] = useState<number>(20);
  const [tractorMaxAmount, setTractorMaxAmount] = useState<number>(15);

  const [farmLevelCost, setFarmLevelCost] = useState<number>(100000);
  const [farmWorkerCost, setFarmWorkerCost] = useState<number>(100);
  const [wheatStorageUpgradeCost, setWheatStorageUpgradeCost] = useState<number>(5000);
  const [fertilizerCost, setFertilizerCost] = useState<number>(350);
  const [tractorCost, setTractorCost] = useState<number>(50000);

  const [wheatStorageAmount, setWheatStorageAmount] = useState<number>(100);

  const [autoHarvestTargetSeconds, setAutoHarvestTargetSeconds] = useState<number>(60000); // 1000 ms = 1 seconds

  useEffect(() => {
    for (let i = 0; i < farmLevel; i++) {
      if (farmLevel > 1) {
        setFarmWorkersMaxAmount(farmWorkersMaxAmount + 5);
        setWheatStorageUpgradeMaxAmount(wheatStorageUpgradeMaxAmount + 5);
        setFertilizerMaxAmount(fertilizerMaxAmount + 5);
        setFarmLevelCost(farmLevelCost * farmLevel);
      }
    }
  }, [farmLevel]);

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
      setAutoHarvestTargetSeconds(autoHarvestTargetSeconds - tractorAmount * 450);
    }
  }, [tractorAmount]);

  useTimer({ target: autoHarvestTargetSeconds, callback: autoHarvestWheat });

  function upgradeFarm(cost: number, amount: number) {
    if (moneyAmount < cost || farmLevel >= 10) {
      return;
    }

    setFarmLevel(farmLevel + amount);
    setMoneyAmount(moneyAmount - cost);
  }

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
        savedFarmLevelCost
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
        farmWorkersAmount,
        wheatStorageUpgradeAmount,
        wheatStorageAmount,
        fertilizerAmount,
        tractorAmount,
        farmLevelMax,
        farmWorkersMaxAmount,
        wheatStorageUpgradeMaxAmount,
        fertilizerMaxAmount,
        tractorMaxAmount,
        farmLevelCost,
        farmWorkerCost,
        wheatStorageUpgradeCost,
        fertilizerCost,
        tractorCost,
        upgradeFarm,
        harvestWheat,
        sellWheat,
        hireFarmWorker,
        upgradeWheatStorage,
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
