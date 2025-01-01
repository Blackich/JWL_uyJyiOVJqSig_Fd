import "./PackageFeatureSet.css";
import { FC, useState } from "react";
import { CustomPackWithoutPrice, PackageSettings } from "@Admin/utils/types";
import { packageApi } from "@Admin/pages/PackageDetails/_packageDetailsApi";
import { calcPrimeCostCustomPackage } from "@Admin/utils/utils";
import { formatRUB, formatUSD } from "@utils/utils";
import { Button, TextField } from "@mui/material";

type Props = {
  customPackData: CustomPackWithoutPrice;
  packageSettings: PackageSettings[];
  factPrice: { price_usd: number; price_rub: number };
  handleCreateCustomPack: VoidFunction;
  setFactPrice: ({
    price_usd,
    price_rub,
  }: {
    price_usd: number;
    price_rub: number;
  }) => void;
};

export const PackageFeatureSet: FC<Props> = ({
  customPackData,
  packageSettings,
  factPrice,
  setFactPrice,
  handleCreateCustomPack,
}) => {
  const [coefficient, setCoefficient] = useState<number>(10);
  const { data: exchangeRate } = packageApi.useGetExchangeRateQuery();
  const primeCostList = packageSettings.map((setting) => [
    setting.typeService,
    setting.cost,
  ]);

  const primeCost = calcPrimeCostCustomPackage({
    primeCost: primeCostList as [string, number][],
    likes: customPackData.likes,
    reach: customPackData.reach,
    videoViews: customPackData.videoViews,
    countPosts: customPackData.countPosts,
    saves: customPackData.saves,
    profileVisits: customPackData.profileVisits,
    reposts: customPackData.reposts,
  });

  const handleDisableButton = () => {
    const checkCustom = Object.values(customPackData).some(
      (value) => value === 0,
    );
    return !factPrice.price_usd || !factPrice.price_rub || checkCustom;
  };

  return (
    <div className="custom-package__feature-set">
      <div className="custom-package__feature-item">
        <span>
          Себестоимость:&nbsp;<p>{formatUSD(primeCost)}</p>
        </span>
      </div>
      <div className="custom-package__feature-item">
        <span>
          Желательная цена (usd):&nbsp;
          <p>{formatUSD(primeCost * coefficient)}</p>
        </span>
      </div>
      <div className="custom-package__feature-item">
        <span>
          Желательная цена (rub):&nbsp;
          {exchangeRate && (
            <p>{formatRUB(primeCost * coefficient * exchangeRate)}</p>
          )}
        </span>
      </div>
      <TextField
        label="Коэффициент"
        type="number"
        defaultValue={10}
        onChange={(e) => setCoefficient(Number(e.target.value))}
      />
      <TextField
        label="Фактическая цена $"
        type="number"
        name="price_usd"
        required
        onChange={(e) =>
          setFactPrice({
            ...factPrice,
            [e.target.name]:
              Number(e.target.value) > 0 ? Number(e.target.value) : 0,
          })
        }
      />
      <TextField
        label="Фактическая цена ₽"
        type="number"
        name="price_rub"
        required
        onChange={(e) =>
          setFactPrice({
            ...factPrice,
            [e.target.name]:
              Number(e.target.value) > 0 ? Number(e.target.value) : 0,
          })
        }
      />
      <Button
        variant="contained"
        sx={{ height: "55px" }}
        onClick={handleCreateCustomPack}
        disabled={handleDisableButton()}
      >
        Создать пакет
      </Button>
    </div>
  );
};
