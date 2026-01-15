import profileImgLarge from '../../assets/profile-large.jpg';
import profileImgPlaceholder from '../../assets/profile-placeholder.jpg';
import profileImg from '../../assets/profile.jpg';
import { Button } from '../../components/Button';
import { DecoderText } from '../../components/DecoderText';
import { Divider } from '../../components/Divider';
import { Heading } from '../../components/Heading';
import { Image } from '../../components/Image';
import { Link } from '../../components/Link';
import { Section } from '../../components/Section';
import { Text } from '../../components/Text';
import { Transition } from '../../components/Transition';
import { Fragment, useState } from 'react';
import { media } from '../../utils/style';
import styles from './Profile.module.css';

const ProfileText = ({ visible, titleId }) => (
  <Fragment>
    <Heading className={styles.title} data-visible={visible} level={3} id={titleId}>
      <DecoderText text="Welcome!" start={visible} delay={500} />
    </Heading>
    <Text className={styles.description} data-visible={visible} size="l" as="p">
      My name is Andy Yan and I&apos;m currently on my third year studying Honours Computer Science at the University of Waterloo.
      
    </Text>
    <Text className={styles.description} data-visible={visible} size="l" as="p">
      I recently interned at BitGo as a Software Engineer and developed a strong interest in blockchain technology and web3, check out my post about my time at BitGo{' '}
      <Link href="/projects/bitgo/">here</Link>.
    </Text>
    {/* <Text className={styles.description} data-visible={visible} size="l" as="p">
      I currently offer private 1 on 1 tutoring for students from grades 1 - 12 academic
      math and programming, contest math and programming to enhance their education and
      develop better mathematical and computational thinking skills. My teachings
      specialize in Canadian curriculums and{' '}
      <Link href="https://cemc.uwaterloo.ca/">CEMC</Link> (math and computer contests made
      by University of Waterloo) content.
    </Text> */}
    <Text className={styles.description} data-visible={visible} size="l" as="p">
      I also offer tutoring services if you are a student interested in contest math and programming or want some guidance for getting into Waterloo CS, checkout my tutoring profile{' '}
      <Link href="https://www.superprof.ca/waterloo-computer-science-student-offering-tutoring-services-for-programming-java-for-contest-and-curriculum-levels.html">
        Superprof Profile
      </Link>{' '}
      and contact me personally if interested!
    </Text>
  </Fragment>
);

export const Profile = ({ id, visible, sectionRef }) => {
  const [focused, setFocused] = useState(false);
  const titleId = `${id}-title`;

  return (
    <Section
      className={styles.profile}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      as="section"
      id={id}
      ref={sectionRef}
      aria-labelledby={titleId}
      tabIndex={-1}
    >
      <Transition in={visible || focused} timeout={0}>
        {visible => (
          <div className={styles.content}>
            <div className={styles.column}>
              <ProfileText visible={visible} titleId={titleId} />
              <Button
                secondary
                className={styles.button}
                data-visible={visible}
                href="/projects"
                icon="send"
              >
                Check out my Projects!
              </Button>
            </div>
            <div className={styles.column}>
              <div className={styles.tag} aria-hidden>
                <Divider
                  notchWidth="64px"
                  notchHeight="8px"
                  collapsed={!visible}
                  collapseDelay={1000}
                />
                <div className={styles.tagText} data-visible={visible}>
                  About Me
                </div>
              </div>
              <div className={styles.image}>
                <Image
                  reveal
                  delay={100}
                  placeholder={profileImgPlaceholder}
                  srcSet={[profileImg, profileImgLarge]}
                  sizes={`(max-width: ${media.mobile}px) 100vw, 480px`}
                  alt="Andy Yan"
                />
                <svg
                  aria-hidden="true"
                  width="135"
                  height="765"
                  viewBox="0 0 135 765"
                  className={styles.svg}
                  data-visible={visible}
                ></svg>
              </div>
            </div>
          </div>
        )}
      </Transition>
    </Section>
  );
};
