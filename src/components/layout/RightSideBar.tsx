import { Box, Text, IconButton, Popover, Portal } from '@chakra-ui/react';

import { useUIContext } from '../../context/UIContext';
import { useGameLogicContext } from '../../context/GameLogicContext';
import { Divider } from '../ui/divider';
import { CustomButton } from '../ui/custom-button';
import { FarmerIcon, SiloIcon, FertilizerIcon, TractorIcon, QuestionmarkIcon, UpgradeIcon } from '../ui/icons';

export function RightSideBar() {
  const { farmWindowOpen, windmillWindowOpen, bakeryWindowOpen } = useUIContext();
  const {
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
                <Popover.Content width={'720px'}>
                  <Popover.Body display={'flex'} flexDirection={'column'} justifyContent={'flex-start'} alignItems={'center'} gap={2}>
                    <Popover.Content bg={'grey'} display={'flex'} flexDirection={'row'} justifyContent={'flex-start'} alignItems={'center'} width={'100%'} padding={2} gap={2}>
                      <UpgradeIcon size={32} color={'yellow'} />
                      <Text fontSize={'md'} fontWeight={'bolder'}>
                        1 Level increase other upgrades capacity by 5 . From level 5 increase field size.
                      </Text>
                    </Popover.Content>
                    <Popover.Content bg={'grey'} display={'flex'} flexDirection={'row'} justifyContent={'flex-start'} alignItems={'center'} width={'100%'} padding={2} gap={2}>
                      <FarmerIcon size={32} color={'yellow'} />
                      <Text fontSize={'md'} fontWeight={'bolder'}>
                        1 Farmer increase the seeding speed by 2 seconds.
                      </Text>
                    </Popover.Content>
                    <Popover.Content bg={'grey'} display={'flex'} flexDirection={'row'} justifyContent={'flex-start'} alignItems={'center'} width={'100%'} padding={2} gap={2}>
                      <SiloIcon size={32} color={'yellow'} />
                      <Text fontSize={'md'} fontWeight={'bolder'}>
                        1 Silo increase the storage capacity by 100.
                      </Text>
                    </Popover.Content>
                    <Popover.Content bg={'grey'} display={'flex'} flexDirection={'row'} justifyContent={'flex-start'} alignItems={'center'} width={'100%'} padding={2} gap={2}>
                      <FertilizerIcon size={32} color={'yellow'} />
                      <Text fontSize={'md'} fontWeight={'bolder'}>
                        1 Bag of fertilizer increase the production of wheat by 2.
                      </Text>
                    </Popover.Content>
                    <Popover.Content bg={'grey'} display={'flex'} flexDirection={'row'} justifyContent={'flex-start'} alignItems={'center'} width={'100%'} padding={2} gap={2}>
                      <TractorIcon size={32} color={'yellow'} />
                      <Text fontSize={'md'} fontWeight={'bolder'}>
                        1 Tractor harvest wheat automatically every 60 seconds.
                      </Text>
                    </Popover.Content>
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
            tooltip={farmLevel >= farmLevelMax ? 'Max' : '$ ' + farmLevelCost}
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
            tooltip={farmWorkersAmount >= farmWorkersMaxAmount ? 'Max' : '$ ' + farmWorkerCost}
            tooltipPlacement="left"
            onClick={() => hireFarmWorker(farmWorkerCost, 1)}
            text="Hire"
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
            tooltip={wheatStorageUpgradeAmount >= wheatStorageUpgradeMaxAmount ? 'Max' : '$ ' + wheatStorageUpgradeCost}
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
            tooltip={fertilizerAmount >= fertilizerMaxAmount ? 'Max' : '$ ' + fertilizerCost}
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
            tooltip={tractorAmount >= tractorMaxAmount ? 'Max' : '$ ' + tractorCost}
            // disabled
            // tooltip="Stopped working. Needs to be fixed."
            tooltipPlacement="left"
            onClick={() => upgradeTractor(tractorCost, 1)}
            text="Buy"
          />
        </Box>
      </Box>
      <Box display={windmillWindowOpen ? 'flex' : 'none'} flexDirection={'column'} width={'100%'} border={'2px solid black'} padding={2} gap={2}>
        <Box display={'flex'} flexDirection={'row'} justifyContent={'flex-start'} alignItems={'center'}>
          <Text fontSize={'xl'} fontWeight={'bolder'}>
            WINDMILL UPGRADES
          </Text>
        </Box>
        <Divider thickness={1} width={'100%'} />
      </Box>
      <Box display={bakeryWindowOpen ? 'flex' : 'none'} flexDirection={'column'} width={'100%'} border={'2px solid black'} padding={2} gap={2}>
        <Box display={'flex'} flexDirection={'row'} justifyContent={'flex-start'} alignItems={'center'}>
          <Text fontSize={'xl'} fontWeight={'bolder'}>
            BAKERY UPGRADES
          </Text>
        </Box>
        <Divider thickness={1} width={'100%'} />
      </Box>
    </Box>
  );
}
