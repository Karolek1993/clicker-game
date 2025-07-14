import { GiCoins, GiWheat, GiWindmill, GiFlour, GiSlicedBread, GiFarmer, GiFertilizerBag, GiField, GiFarmTractor, GiUpgrade } from 'react-icons/gi';
import { PiFarm } from 'react-icons/pi';
import { MdBakeryDining } from 'react-icons/md';
import { SiNamesilo } from 'react-icons/si';
import { MdConstruction } from 'react-icons/md';
import { HiMiniQuestionMarkCircle } from 'react-icons/hi2';

interface IconProps {
  size: number | string;
  color: string;
}

export function CoinIcon(props: IconProps) {
  return <GiCoins size={props.size} color={props.color} />;
}

export function WheatIcon(props: IconProps) {
  return <GiWheat size={props.size} color={props.color} />;
}

export function FlourIcon(props: IconProps) {
  return <GiFlour size={props.size} color={props.color} />;
}

export function BreadIcon(props: IconProps) {
  return <GiSlicedBread size={props.size} color={props.color} />;
}

export function FarmIcon(props: IconProps) {
  return <PiFarm size={props.size} color={props.color} />;
}

export function WindmillIcon(props: IconProps) {
  return <GiWindmill size={props.size} color={props.color} />;
}

export function BakeryIcon(props: IconProps) {
  return <MdBakeryDining size={props.size} color={props.color} />;
}

export function FarmerIcon(props: IconProps) {
  return <GiFarmer size={props.size} color={props.color} />;
}

export function SiloIcon(props: IconProps) {
  return <SiNamesilo size={props.size} color={props.color} />;
}

export function FertilizerIcon(props: IconProps) {
  return <GiFertilizerBag size={props.size} color={props.color} />;
}

export function TractorIcon(props: IconProps) {
  return <GiFarmTractor size={props.size} color={props.color} />;
}

export function QuestionMarkIcon(props: IconProps) {
  return <HiMiniQuestionMarkCircle size={props.size} color={props.color} />;
}

export function UpgradeIcon(props: IconProps) {
  return <GiUpgrade size={props.size} color={props.color} />;
}

export function FieldIcon(props: IconProps) {
  return <GiField size={props.size} color={props.color} />;
}

export function ConstructionIcon(props: IconProps) {
  return <MdConstruction size={props.size} color={props.color} />;
}
