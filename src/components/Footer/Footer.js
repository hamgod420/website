import { Link } from '../../components/Link';
import { Text } from '../../components/Text';
import { classes } from '../../utils/style';
import styles from './Footer.module.css';

export const Footer = ({ className }) => (
  <footer className={classes(styles.footer, className)}>
    <Text size="s" align="center">
      <span className={styles.date}>{`© ${new Date().getFullYear()} Andy Yan.`}</span>
    </Text>
  </footer>
);
