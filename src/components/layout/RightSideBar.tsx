import { Box, Text, IconButton, Popover, Portal } from '@chakra-ui/react';

import { useUIContext } from '../../context/UIContext';
import { useGameLogicContext } from '../../context/GameLogicContext';
import { Divider } from '../ui/divider';
import { CustomButton } from '../ui/custom-button';
import { CustomPopoverContent } from '../ui/custom-popover-content';
import { FarmerIcon, SiloIcon, FertilizerIcon, TractorIcon, QuestionmarkIcon, UpgradeIcon, FieldIcon } from '../ui/icons';

import { useCurrencyFormater } from '../../hooks/NumberFormater';

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
                <QuestionmarkIcon size={24} color={'yellow'} />
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
                    <CustomPopoverContent icon={<TractorIcon size={32} color={'yellow'} />} text={'Harvest wheat automatically.'} />
                  </Popover.Body>
                </Popover.Content>
              </Popover.Positioner>
            </Portal>
          </Popover.Root>
        </Box>
        <Divider thickness={1} width={'100%'} />
        <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
          <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} width={'50%'} alignItems={'center'}>
            <UpgradeIcon size={32} color={'yellow'} />
            <Text fontSize={'xl'}>
              {farmLevel} / {farmLevelMax}
            </Text>
          </Box>
          <CustomButton
            disabled={farmLevel >= farmLevelMax}
            tooltip={farmLevel >= farmLevelMax ? 'Max' : useCurrencyFormater(farmLevelCost)}
            tooltipPlacement="left"
            onClick={() => upgradeFarm(farmLevelCost, 1)}
            text="Upgrade"
          />
        </Box>

        <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
          <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} width={'50%'} alignItems={'center'}>
            <FarmerIcon size={32} color={'yellow'} />
            <Text fontSize={'xl'}>
              {farmWorkersAmount} / {farmWorkersMaxAmount}
            </Text>
          </Box>
          <CustomButton
            disabled={farmWorkersAmount >= farmWorkersMaxAmount}
            tooltip={farmWorkersAmount >= farmWorkersMaxAmount ? 'Max' : useCurrencyFormater(farmWorkerCost)}
            tooltipPlacement="left"
            onClick={() => hireFarmWorker(farmWorkerCost, 1)}
            text="Hire"
          />
        </Box>
        <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
          <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} width={'50%'} alignItems={'center'}>
            <FieldIcon size={32} color={'yellow'} />
            <Text fontSize={'xl'}>
              {wheatFieldAmount} / {wheatFieldMaxAmount}
            </Text>
          </Box>
          <CustomButton
            disabled={wheatFieldAmount >= wheatFieldMaxAmount}
            tooltip={wheatFieldAmount >= wheatFieldMaxAmount ? 'Max' : useCurrencyFormater(wheatFieldCost)}
            tooltipPlacement="left"
            onClick={() => upgradeWheatField(wheatFieldCost, 1)}
            text="Buy"
          />
        </Box>
        <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
          <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} width={'50%'} alignItems={'center'}>
            <SiloIcon size={32} color={'yellow'} />
            <Text fontSize={'xl'}>
              {wheatStorageUpgradeAmount} / {wheatStorageUpgradeMaxAmount}
            </Text>
          </Box>
          <CustomButton
            disabled={wheatStorageUpgradeAmount >= wheatStorageUpgradeMaxAmount}
            tooltip={wheatStorageUpgradeAmount >= wheatStorageUpgradeMaxAmount ? 'Max' : useCurrencyFormater(wheatStorageUpgradeCost)}
            tooltipPlacement="left"
            onClick={() => upgradeWheatStorage(wheatStorageUpgradeCost, 100)}
            text="Buy"
          />
        </Box>
        <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
          <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} width={'50%'} alignItems={'center'}>
            <FertilizerIcon size={32} color={'yellow'} />
            <Text fontSize={'xl'}>
              {fertilizerAmount} / {fertilizerMaxAmount}
            </Text>
          </Box>
          <CustomButton
            disabled={fertilizerAmount >= fertilizerMaxAmount}
            tooltip={fertilizerAmount >= fertilizerMaxAmount ? 'Max' : useCurrencyFormater(fertilizerCost)}
            tooltipPlacement="left"
            onClick={() => upgradeFerilizer(fertilizerCost, 1)}
            text="Buy"
          />
        </Box>
        <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
          <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} width={'50%'} alignItems={'center'}>
            <TractorIcon size={32} color={'yellow'} />
            <Text fontSize={'xl'}>
              {tractorAmount} / {tractorMaxAmount}
            </Text>
          </Box>
          <CustomButton
            disabled={tractorAmount >= tractorMaxAmount}
            tooltip={tractorAmount >= tractorMaxAmount ? 'Max' : useCurrencyFormater(tractorCost)}
            tooltipPlacement="left"
            onClick={() => upgradeTractor(tractorCost, 1)}
            text="Buy"
          />
        </Box>
      </Box>
    </Box>
  );
}
