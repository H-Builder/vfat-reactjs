import React, { useEffect, useState } from "react";
import cx from "classnames";
import { Box, useMediaQuery } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useIsDarkMode } from "state/user/hooks";

import Carousel from 'react-elastic-carousel'
import { getNetworkInfo, fetchLogo } from "hooks";

import ICON_TOKEN from 'assets/icon/awesome-coins.svg'
import ICON_WEBSITE from 'assets/icon/ionic-md-link.svg'
import { useHistory, useLocation } from "react-router-dom";

import { networks, networkItemType } from 'data'

const useStyles = makeStyles(({ palette }) => ({
  root: {
    height: '100%'
  },

  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '50px'
  },

  network: {
    display: 'flex',
    alignItems: 'center'
  },

  networkName: {
    fontWeight: 900,
    color: palette.primary.main
  },

  changeNetwork: {
    fontSize: '10px',
    color: palette.primary.light,
    cursor: 'pointer',
    transition: 'border .2s ease-in',
    borderBottom: `1px solid transparent`,
    display: 'inline-block',

    '&:hover': {
      borderBottom: `1px solid ${palette.primary.light}`
    }
  },

  filter: {

  },

  carouselItem: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: palette.text.primary,
    fontWeight: 'bold',
  },

  poolName: {
    fontSize: '20px',
  },

  tokenName: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '10px'
  },

  webSite: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '10px'
  }
}));

const NetworksInfo: React.FC = () => {
  const { breakpoints } = useTheme();
  const dark = useIsDarkMode();
  const mobile = useMediaQuery(breakpoints.down("xs"));
  const classes = useStyles({ dark, mobile });
  const location = useLocation();
  const history = useHistory();
  const [info, setInfo] = useState<networkItemType>({
    name: '',
    logoSrc: '',
    redirectUrl: ''
  })

  const TableData = getNetworkInfo();
  const { rows } = TableData;

  const colorList = ['#FDC113', '#C81B72', '#1BC870']

  const renderHighlight = (value: string | number, i: number) => {
    return (
      <Box component='span' color={colorList[i % 3]}>
        {value}
      </Box>
    )
  }

  const handleChangeNetwork = () => {
    history.push('/networks')
  }

  useEffect(() => {
    if (location && location.pathname) {
      const found = networks.find((item) => item.redirectUrl === location.pathname)
      found && setInfo(found)
    }
  }, [location]);

  return (
    <Box className={cx(classes.root)}>
      <Box className={cx(classes.toolbar)}>
        <Box className={cx(classes.network)}>
          <img src={info.logoSrc} alt='network logo' width='60px' height='60px' />
          <Box textAlign='right' display='inline-block'>
            <Box className={cx(classes.networkName)}>
              {info.name}
            </Box>
            <Box className={cx(classes.changeNetwork)} onClick={handleChangeNetwork}>Change Network</Box>
          </Box>
        </Box>
        <Box className={cx(classes.filter)}>

        </Box>
      </Box>

      <Carousel
        itemsToShow={3}
        isRTL={false}
        renderPagination={() => {
          return <></>
        }}
      >
        {rows && rows.map((row: string[], i: number) => (
          <Box className={cx(classes.carouselItem)} key={i}>
            <img src={fetchLogo(row[0])} alt={row[0]} width='150px' height='150px' />
            <Box mt={'20px'} />
            <Box className={cx(classes.poolName)}>
              {renderHighlight('#' + (i + 1), i)}&nbsp;
              {row[0]}
            </Box>
            <Box mt={'15px'} />
            <Box className={cx(classes.tokenName)}>
              <img src={ICON_TOKEN} alt='Token' width='20px' height='20px' />&nbsp;
              REWARD TOKEN:&nbsp;
              {renderHighlight(row[2], i)}
            </Box>
            <Box mt={'15px'} />
            <Box className={cx(classes.webSite)}>
              <img src={ICON_WEBSITE} alt='WebSite' width='20px' height='20px' />&nbsp;
              Website:&nbsp;
              {renderHighlight(row[3], i)}
            </Box>
          </Box>
        ))}
      </Carousel>
    </Box>
  );
};

export default NetworksInfo;
