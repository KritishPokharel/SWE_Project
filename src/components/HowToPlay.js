// src/components/HowToPlay.js

import React from "react";
import {
  Box,
  Typography,
  Container,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Link,
} from "@mui/material";
import {
  Login as LoginIcon,
  Create as CreateIcon,
  PlayCircleOutline as PlayCircleOutlineIcon,
  Star as StarIcon,
  TipsAndUpdates as TipsIcon,
} from "@mui/icons-material";
import { useTranslation } from 'react-i18next';

const HowToPlay = () => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #141e30, #243b55)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <Container
        sx={{
          background: "rgba(255, 255, 255, 0.95)",
          padding: "40px",
          borderRadius: "16px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
          color: "#141e30",
          maxWidth: "900px",
        }}
      >
        <Typography variant="h3" gutterBottom align="center">
          {t('how_to_play_title')}
        </Typography>
        <Divider sx={{ marginY: "30px" }} />

        {/* Section 1: Logging In */}
        <Typography variant="h5" gutterBottom>
          {t('how_to_play_section_1_title')}
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <LoginIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary={t('how_to_play_section_1_step_a')}
              secondary={t('how_to_play_section_1_step_a_desc')}
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <LoginIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary={t('how_to_play_section_1_step_b')}
              secondary={t('how_to_play_section_1_step_b_desc')}
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <LoginIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary={t('how_to_play_section_1_step_c')}
              secondary={t('how_to_play_section_1_step_c_desc')}
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <LoginIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary={t('how_to_play_section_1_step_d')}
              secondary={t('how_to_play_section_1_step_d_desc')}
            />
          </ListItem>
        </List>

        <Divider sx={{ marginY: "30px" }} />

        {/* Section 2: Creating a Challenge */}
        <Typography variant="h5" gutterBottom>
          {t('how_to_play_section_2_title')}
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <CreateIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary={t('how_to_play_section_2_step_a')}
              secondary={t('how_to_play_section_2_step_a_desc')}
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CreateIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary={t('how_to_play_section_2_step_b')}
              secondary={t('how_to_play_section_2_step_b_desc')}
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CreateIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary={t('how_to_play_section_2_step_c')}
              secondary={t('how_to_play_section_2_step_c_desc')}
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CreateIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary={t('how_to_play_section_2_step_d')}
              secondary={t('how_to_play_section_2_step_d_desc')}
            />
          </ListItem>
        </List>

        <Divider sx={{ marginY: "30px" }} />

        {/* Section 3: Playing a Challenge */}
        <Typography variant="h5" gutterBottom>
          {t('how_to_play_section_3_title')}
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <PlayCircleOutlineIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary={t('how_to_play_section_3_step_a')}
              secondary={t('how_to_play_section_3_step_a_desc')}
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <PlayCircleOutlineIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary={t('how_to_play_section_3_step_b')}
              secondary={t('how_to_play_section_3_step_b_desc')}
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <PlayCircleOutlineIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary={t('how_to_play_section_3_step_c')}
              secondary={t('how_to_play_section_3_step_c_desc')}
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <PlayCircleOutlineIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary={t('how_to_play_section_3_step_d')}
              secondary={t('how_to_play_section_3_step_d_desc')}
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <PlayCircleOutlineIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary={t('how_to_play_section_3_step_e')}
              secondary={t('how_to_play_section_3_step_e_desc')}
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <PlayCircleOutlineIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary={t('how_to_play_section_3_step_f')}
              secondary={t('how_to_play_section_3_step_f_desc')}
            />
          </ListItem>
        </List>

        <Divider sx={{ marginY: "30px" }} />

        {/* Section 4: Understanding the Scoring System */}
        <Typography variant="h5" gutterBottom>
          {t('how_to_play_section_4_title')}
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <StarIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary={t('how_to_play_section_4_step_a')}
              secondary={t('how_to_play_section_4_step_a_desc')}
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <StarIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary={t('how_to_play_section_4_step_b')}
              secondary={t('how_to_play_section_4_step_b_desc')}
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <StarIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary={t('how_to_play_section_4_step_c')}
              secondary={t('how_to_play_section_4_step_c_desc')}
            />
          </ListItem>
        </List>

        <Divider sx={{ marginY: "30px" }} />

        {/* Section 5: Tips and Best Practices */}
        <Typography variant="h5" gutterBottom>
          {t('how_to_play_section_5_title')}
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <TipsIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary={t('how_to_play_section_5_step_a')}
              secondary={t('how_to_play_section_5_step_a_desc')}
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <TipsIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary={t('how_to_play_section_5_step_b')}
              secondary={t('how_to_play_section_5_step_b_desc')}
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <TipsIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary={t('how_to_play_section_5_step_c')}
              secondary={t('how_to_play_section_5_step_c_desc')}
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <TipsIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary={t('how_to_play_section_5_step_d')}
              secondary={t('how_to_play_section_5_step_d_desc')}
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <TipsIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary={t('how_to_play_section_5_step_e')}
              secondary={t('how_to_play_section_5_step_e_desc')}
            />
          </ListItem>
        </List>

        <Divider sx={{ marginY: "30px" }} />

        <Box sx={{ marginTop: "40px", textAlign: "center" }}>
          <Typography variant="body2" color="textSecondary">
            {t('how_to_play_footer', { year: new Date().getFullYear() })}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default HowToPlay;
