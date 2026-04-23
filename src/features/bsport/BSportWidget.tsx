import React from 'react';
import { useBSportWidget } from './useBSportWidget';
import type { BSportWidgetVariant } from './widgetConfigs';

interface BSportWidgetProps {
  containerId: string;
  variant: BSportWidgetVariant;
  className?: string;
}

export const BSportWidget: React.FC<BSportWidgetProps> = ({
  containerId,
  variant,
  className = '',
}) => {
  useBSportWidget(containerId, variant);
  return <div id={containerId} className={className} />;
};
