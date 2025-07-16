import { Box, Text, IconButton, Popover, Portal } from '@chakra-ui/react';

import { useUIContext } from '../../context/UIContext';
import { useGameLogicContext } from '../../context/GameLogicContext';
import { Divider } from '../ui/divider';
import { CustomPopoverContent } from '../ui/custom-popover-content';
import { UpgradeSection } from '../UpgradeSection';
import { FarmerIcon, SiloIcon, FertilizerIcon, TractorIcon, QuestionMarkIcon, UpgradeIcon, FieldIcon } from '../ui/icons';

export function RightSideBar() {
  const { farmWindowOpen } = useUIContext();
  const {
    wheatFieldAmount,
    wheatFieldMaxAmount,
    wheatFieldCost,
    upgradeWheatField,
    farmWorkersAmount,
    farmWorkersMaxAmount,
    farmWorkerCost,
    hireFarmWorker,
    wheatStorageUpgradeAmount,
    wheatStorageUpgradeMaxAmount,
    wheatStorageUpgradeCost,
    upgradeWheatStorage,
    fertilizerAmount,
    fertilizerMaxAmount,
    fertilizerCost,
    upgradeFerilizer,
    tractorAmount,
    tractorMaxAmount,
    tractorCost,
    upgradeTractor,
    farmLevel,
    farmLevelMax,
    farmLevelCost,
    upgradeFarm,
  } = useGameLogicContext();

  return (
    <Box display={'flex'} flexDirection={'column'} justifyContent={'flex-start'} alignItems={'center'} border={'3px solid black'} width={'25%'} height={'100%'} padding={2} gap={2}>
      <Box display={farmWindowOpen ? 'flex' : 'none'} flexDirection={'column'} width={'100%'} border={'2px solid black'} padding={2} gap={2}>
        <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
          <Text fontSize={'xl'} fontWeight={'bolder'}>
            FARM UPGRADES
          </Text>
          <Popover.Root>
            <Popover.Trigger asChild>
              <IconButton variant="ghost" size="md">
                <QuestionMarkIcon size={24} color={'yellow'} />
              </IconButton>
            </Popover.Trigger>
            <Portal>
              <Popover.Positioner>
                <Popover.Content width={'720px'} borderRadius={0}>
                  <Popover.Body display={'flex'} flexDirection={'column'} justifyContent={'flex-start'} alignItems={'center'} gap={2}>
                    <CustomPopoverContent icon={<UpgradeIcon size={32} color={'yellow'} />} text={'Increase other upgrades capacity by 5. '} />
                    <CustomPopoverContent icon={<FarmerIcon size={32} color={'yellow'} />} text={'Increase the seeding speed by 1 second.'} />
                    <CustomPopoverContent icon={<FieldIcon size={32} color={'yellow'} />} text={'Increase the amount of wheat field by 1.'} />
                    <CustomPopoverContent icon={<SiloIcon size={32} color={'yellow'} />} text={'Increase the storage capacity by 100.'} />
                    <CustomPopoverContent icon={<FertilizerIcon size={32} color={'yellow'} />} text={'Increase the production of wheat by 2.'} />
                    <CustomPopoverContent icon={<TractorIcon size={32} color={'yellow'} />} text={'Automatic harvest. Harvesting time is reduced by 4 seconds per tractor.'} />
                  </Popover.Body>
                </Popover.Content>
              </Popover.Positioner>
            </Portal>
          </Popover.Root>
        </Box>
        <Divider thickness={1} width={'100%'} />
        <UpgradeSection
          icon={<UpgradeIcon size={32} color={'yellow'} />}
          amount={farmLevel}
          maxAmount={farmLevelMax}
          cost={farmLevelCost}
          upgradeAmount={1}
          upgrade={upgradeFarm}
        />
        <UpgradeSection
          icon={<FarmerIcon size={32} color={'yellow'} />}
          amount={farmWorkersAmount}
          maxAmount={farmWorkersMaxAmount}
          cost={farmWorkerCost}
          upgradeAmount={1}
          upgrade={hireFarmWorker}
        />
        <UpgradeSection
          icon={<FieldIcon size={32} color={'yellow'} />}
          amount={wheatFieldAmount}
          maxAmount={wheatFieldMaxAmount}
          cost={wheatFieldCost}
          upgradeAmount={1}
          upgrade={upgradeWheatField}
        />
        <UpgradeSection
          icon={<SiloIcon size={32} color={'yellow'} />}
          amount={wheatStorageUpgradeAmount}
          maxAmount={wheatStorageUpgradeMaxAmount}
          cost={wheatStorageUpgradeCost}
          upgradeAmount={100}
          upgrade={upgradeWheatStorage}
        />
        <UpgradeSection
          icon={<FertilizerIcon size={32} color={'yellow'} />}
          amount={fertilizerAmount}
          maxAmount={fertilizerMaxAmount}
          cost={fertilizerCost}
          upgradeAmount={1}
          upgrade={upgradeFerilizer}
        />
        <UpgradeSection
          icon={<TractorIcon size={32} color={'yellow'} />}
          amount={tractorAmount}
          maxAmount={tractorMaxAmount}
          cost={tractorCost}
          upgradeAmount={1}
          upgrade={upgradeTractor}
        />
      </Box>
    </Box>
  );
}
